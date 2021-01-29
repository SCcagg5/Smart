import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, Checkbox, Chip, Avatar, Checkbox as MuiCheckbox, Button as MuiButton} from "@material-ui/core";
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Data from "../../data/Data";
import CalendyDateHourPicker from "../Pickers/CalendyDateHourPicker";
import AltAvatarGroup from '@atlaskit/avatar-group';
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Chips from "../EmailsInputChips/Chips";
import data from "../../data/Data";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import RoomDocs from "../List/RoomDocs";
import CircularProgress from '@material-ui/core/CircularProgress';
import SmartService from "../../provider/SmartService";
//import SmartService from "../../provider/masterNodeService";
import entIcon from "../../assets/images/entreprise-icon.png";
import userAvatar from "../../assets/images/users/user4.jpg";
import Modal, {ModalTransition} from "@atlaskit/modal-dialog";
import Chat from "../../pages/Chat/Chat";
import Popover from "@material-ui/core/Popover";
import Textfield from '@atlaskit/textfield';
import {Dropdown} from "semantic-ui-react";
import ReactTagInput from "@pathofdev/react-tag-input";
import main_functions from "../../controller/main_functions";
import AltAvatar from '@atlaskit/avatar';
import DescriptionIcon from '@material-ui/icons/Description';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {Tree} from "antd";
import moment from "moment";
import rethink from "../../controller/rethink";
import { withStyles } from '@material-ui/core/styles';
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import ListAltIcon from '@material-ui/icons/ListAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Board from 'react-trello'
import VoiceRecorder from "../Recorder/VoiceRecorder";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const {DirectoryTree} = Tree;

const GreenCheckbox = withStyles({
    root: {
        color: grey[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const db_name = "OA_LEGAL";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="room-tabpanel"
            hidden={value !== index}
            id={`room-tabpanel-${index}`}
            aria-labelledby={`room-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `room-tab-${index}`,
        'aria-controls': `room-tabpanel-${index}`,
    };
}


export default function RoomTabs(props) {

    const [newTaskTitle, setnewTaskTitle] = React.useState("");
    const [newTaskDesc, setNewTaskDesc] = React.useState("");
    const [newTaskPriority, setNewTaskPriority] = React.useState("1");
    const [newTaskClient, setNewTaskClient] = React.useState("");
    const [newTaskTags, setNewTaskTags] = React.useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAssign, setSelectedAssign] = useState("");
    const [openDateTimePickerModal, setOpenDateTimePickerModal] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState("");
    const [openTeamModal, setOpenTeamModal] = useState(false);
    const [teamEmails, setTeamEmails] = useState([]);
    const [teamCheck1, setTeamCheck1] = useState(false);
    const [teamCheck2, setTeamCheck2] = useState(true);
    const [loadindFiles, setloadingFiles] = useState(false);
    const [roomDocs, setRoomDocs] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [anchorElFiles, setAnchorElFiles] = useState(null);

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);


    const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [draggedTaskId, setDraggedTaskId] = useState("");

    const [isDragRoomFilesOver, setIsDragRoomFilesOver] = useState(false);


    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys)
        setAutoExpandParent(false)
    }

    const onSelect = (selectedKeys, info) => {
        setSelectedKeys(selectedKeys)
    }

    const onDrop_container = (e,task) => {
        e.preventDefault();e.stopPropagation();
        setIsDragOver(false)
        setDraggedTaskId("")
        let recievedItem = JSON.parse(e.dataTransfer.getData("file"));
        if(recievedItem.typeF === "file"){
            addTaskFile(recievedItem,task)
        }else{
            props.openSnackbar("warning","Seuls les fichiers peuvent être glissés ici")
        }
        e.dataTransfer.clearData();
    }

    const onDropRoomFiles_container = (e) => {
        e.preventDefault();e.stopPropagation();
        setIsDragRoomFilesOver(false)
        let recievedItem = JSON.parse(e.dataTransfer.getData("file"));
        if(recievedItem.typeF === "file"){
            addRoomFile(recievedItem)
        }else{
            props.openSnackbar("warning","Seuls les fichiers peuvent être glissés ici")
        }
        e.dataTransfer.clearData();
    }

    const addTaskFile = (file,task) => {
        let room = props.room;
        let task_index = (room.tasks || []).findIndex(x => x.uid === task.uid );
        if(task_index > -1){
            let files = room.tasks[task_index].files || [];
            let task_members = (room.tasks[task_index].team || []);
            SmartService.share(file.id,
                {
                    to: room.tasks[task_index].leader.email,
                    access: {administrate: false, share: false, edit:  false, read: true}
                }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(shareRes => {
                if (shareRes.succes === true && shareRes.status === 200) {
                    console.log("Share Leader OK")
                }else{
                    console.log(shareRes.error)
                }
            }).catch(err => {console.log(err)})
            task_members.filter(x => x.email !== localStorage.getItem("email")).map((member,key) => {
                SmartService.share(file.id,
                    {
                        to: member.email,
                        access: {administrate: false, share: false, edit:  false, read: true}
                    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(shareRes => {
                    if (shareRes.succes === true && shareRes.status === 200) {
                        console.log("Share"+key +" OK")
                    }else{
                        console.log(shareRes.error)
                    }
                }).catch(err => {console.log(err)})
            })

            let team_validation = [];
            (room.tasks[task_index].team || []).map((t,key) => {
                team_validation.push({
                    id:t.id,
                    email:t.email,
                    validation:"false"
                })
            })
            files.push({
                id_in_ged:file.id,
                name_in_ged:file.name,
                added_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                added_by:{
                    email:localStorage.getItem("email"),
                    id:main_functions.getContactIdByEmail(props.contacts,localStorage.getItem("email"))
                },
                leader_validation:"false",
                team_validation:team_validation,
                type:"ged"
            })
            room.tasks[task_index].files = files;
            rethink.update("test",'table("rooms").get('+JSON.stringify(room.id)+').update('+ JSON.stringify(room) + ')',db_name,false).then( updateRes => {
                if (updateRes && updateRes === true) {

                } else {

                }
            }).catch(err => {console.log(err)})
        }
    }

    const addRoomFile = (file) => {
        let room = props.room;
        let files = room.files || [];
        let room_members = (room.members || []).filter(x => x.email !== localStorage.getItem("email"));
        room_members.map((member,key) => {
            SmartService.share(file.id,
                {
                    to: member.email,
                    access: {administrate: false, share: false, edit:  false, read: true}
                }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(shareRes => {
                if (shareRes.succes === true && shareRes.status === 200) {
                    console.log("Share"+key +" OK")
                }else{
                    console.log(shareRes.error)
                }
            }).catch(err => {console.log(err)})
        })
        files.push({
            id_in_ged:file.id,
            name_in_ged:file.name,
            added_at:moment().format("YYYY-MM-DD HH:mm:ss"),
            added_by:{
                email:localStorage.getItem("email"),
                id:main_functions.getContactIdByEmail(props.contacts,localStorage.getItem("email"))
            },
            type:"ged"
        })
        room.files = files
        rethink.update("test",'table("rooms").get('+JSON.stringify(room.id)+').update('+ JSON.stringify(room) + ')',db_name,false).then( updateRes => {
            if (updateRes && updateRes === true) {

            } else {
                console.log("Error update room files")
            }
        }).catch(err => {console.log(err)})
    }

    let contactSelectOptions = [];
    contactSelectOptions.push({label:"Aucun",value:""})
    props.annuaire_clients_mandat.map((client,key) => {
        contactSelectOptions.push({value:client.contactName,
            label:<div><img alt="" src={client.Type === "1" ? client.imageUrl ? client.imageUrl : userAvatar : entIcon}
                            style={{width:30,height:30,objectFit:"cover"}}/>{client.contactName}</div>
        })
    })

    const tasks = props.room.tasks || [];
    tasks.sort( (a,b) => {
        var c = new Date(a.created_at);
        var d = new Date(b.created_at);
        return d-c;
    });

    const openFilesPopup = Boolean(anchorElFiles);
    const id = openFilesPopup ? 'files-popover' : undefined;

    let [audioURL, isRecording, startRecording, stopRecording] = VoiceRecorder();

    return (
        <div>
            <Tabs value={props.selectedRoomTab} onChange={props.handleRoomTabsChange} aria-label="room tabs " indicatorColor="primary" textColor="primary"

            >
                <Tab label="Tâches" icon={<ListAltIcon/>} {...a11yProps(0)} style={{fontWeight:600,textTransform:"capitalize"}} />
                <Tab label="Fichiers" icon={<PostAddIcon/>} {...a11yProps(1)} style={{fontWeight:600,textTransform:"capitalize"}} disabled={false} />
                <Tab label="Chat" icon={<ChatOutlinedIcon/>} {...a11yProps(2)} style={{fontWeight:600,textTransform:"capitalize"}} disabled={false} />
                <Tab label="tableau kanban" icon={<DashboardIcon/>} {...a11yProps(3)} style={{fontWeight:600,textTransform:"capitalize"}} disabled={true} />
                {/*<Tab label="Recorder Test" icon={<DashboardIcon/>} {...a11yProps(3)} style={{fontWeight:600,textTransform:"capitalize"}} disabled={false} />*/}
            </Tabs>

            <TabPanel value={props.selectedRoomTab} index={2}>
                <div style={{marginTop:15}}>
                    <Chat contacts={props.contacts || []} room_id={props.room.id} history={props.history}
                          miniDrive={props.miniDrive}
                          openPdfModal={props.openPdfModal}
                          room={props.room}
                          openSnackbar={props.openSnackbar}
                    />
                </div>
            </TabPanel>

            <TabPanel value={props.selectedRoomTab} index={1}>

                <div style={{border:isDragRoomFilesOver === true ? "2px solid dodgerblue " : "2px solid #f0f0f0",borderRadius:7.5,marginBottom:10,marginTop:25}}
                     onDragOver={(e) => {
                         e.preventDefault();e.stopPropagation();
                         setIsDragRoomFilesOver(true)
                     }}
                     onDragLeave={(e) => {
                         e.preventDefault();e.stopPropagation();
                         setIsDragRoomFilesOver(false)
                     }}
                     onDrop={(e) => {onDropRoomFiles_container(e)}}
                >
                    <div style={{display:"flex",marginLeft:20,justifyContent:"space-between"}}>
                        <h6>{'#Fichiers'}</h6>
                        <NoteAddIcon color="primary" fontSize="small" style={{marginTop:5,marginRight:3,cursor:"pointer"}}
                                     onClick={(e) => {setAnchorElFiles(e.currentTarget)}}
                        />
                    </div>

                    <div style={{padding:10,marginLeft:20,marginBottom:10,marginRight:15}}>
                        {
                            (props.room.files || []).length > 0 &&
                            <div style={{width:"100%",display:"flex",marginBottom:10}}>
                                <div style={{minWidth:"30%"}}/>
                                <div style={{minWidth:"25%"}}><h6>Ajouté par</h6></div>
                                <div style={{minWidth:"25%",marginRight:30}}><h6>Ajouté le</h6></div>
                            </div>
                        }
                        {
                            (props.room.files || []).map((file, key) => (
                                <div key={key} style={{border:"1px solid #f0f0f0",borderRadius:7.5,width:"100%",display:"flex",marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,.25)",cursor:"pointer"}}
                                     onClick={() => props.openPdfModal(file.id_in_ged)}
                                >
                                    <div style={{display:"flex",minWidth:"30%",alignItems:"center"}}>
                                        <IconButton size="small">
                                            <DescriptionIcon color="error"/>
                                        </IconButton>
                                        <h6 style={{fontSize:"smaller",maxWidth:160}}>{file.name_in_ged}</h6>
                                    </div>
                                    <div style={{minWidth:"25%",alignSelf:"center"}}>
                                        <h6>{file.added_by.id === "" ? file.added_by.email : main_functions.getContactFnameById(props.contacts,file.added_by.id)}</h6>
                                    </div>
                                    <div style={{minWidth:"25%",width:"100%",alignSelf:"center"}}>
                                        <h6>{file.added_at}</h6>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={props.selectedRoomTab} index={0}>
                <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:-2}}/>
                <div style={{marginTop:45}}>
                    <Button
                        variant="text" onClick={() => setOpenNewTaskModal(true)}
                        style={{textTransform:"none",backgroundColor:"transparent",color:"#1a73e8",fontWeight:600}}
                        startIcon={<LibraryAddCheckIcon style={{color:"#1a73e8"}} />}
                    >
                        Ajouter une tâche
                    </Button>

                    <div style={{marginTop:20,marginLeft:15,marginRight:15}}>
                        {
                            (tasks || []).map((task,key) => (
                                <div key={key} className="task_container" style={{backgroundColor:"#fff",minWidth:800}}>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <div>
                                            <div style={{display:"flex"}}>
                                                {/*<Checkbox style={{marginTop:-8}}
                                                    //checked={}
                                                          color="primary"
                                                          size="small"
                                                />*/}
                                                <h5>{task.title}</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={task.priority === "0" ? "badge badge-info text-white p-1" : task.priority === "1" ? "badge badge-success text-white p-1" :"badge badge-danger text-white p-1"}>
                                                {task.priority === "0" ? "faible" : task.priority === "1" ? "Normal" : "Elevée"}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{marginTop:5}}>
                                        <p style={{width:"90%",marginLeft:20}}>{task.desc}</p>
                                    </div>
                                    <div>
                                        <div style={{display:"flex",justifyContent:"space-around"}}>
                                            <div>
                                                <h6>Leader</h6>
                                                <div  style={{display:"flex"}}>
                                                    <AltAvatar src={main_functions.getContactImageById(props.contacts,task.leader.id)}
                                                               size="small" appearance="circle" borderColor="#c0c0c0"/>
                                                    <p style={{marginLeft:3}}>
                                                        {
                                                            task.leader.id === "" ? task.leader.email : main_functions.getContactFnameById(props.contacts,task.leader.id)
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                            <div>
                                                <h6>Equipe</h6>
                                                <AltAvatarGroup appearance="stack" maxCount={5} borderColor="#c0c0c0" isTooltipDisabled={false}
                                                                size="small"
                                                                data={(task.team || []).map((item,key) => ({
                                                                    name:item.id === "" ? item.email : main_functions.getContactFnameById(props.contacts,item.id),
                                                                    src:main_functions.getContactImageById(props.contacts,item.id),
                                                                    appearance:"circle"
                                                                }))}
                                                />
                                            </div>
                                            <div>
                                                <h6>Client</h6>
                                                <p style={{textDecoration:"underline"}} onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    //props.history.push("/home/clients/"+task.client)
                                                }}
                                                >
                                                    {
                                                        main_functions.getClientNameById(props.annuaire_clients_mandat,task.client) === "" ? "Non attribué" :
                                                            main_functions.getClientNameById(props.annuaire_clients_mandat,task.client)
                                                    }
                                                </p>
                                            </div>



                                        </div>
                                    </div>
                                    <div style={{border:isDragOver && draggedTaskId === task.uid ? "2px solid dodgerblue " : "1px solid #f0f0f0",borderRadius:7.5,marginBottom:5}}
                                         onDragOver={(e) => {
                                             e.preventDefault();e.stopPropagation();
                                             setIsDragOver(true)
                                             setDraggedTaskId(task.uid)
                                         }}
                                         onDragLeave={(e) => {
                                             e.preventDefault();e.stopPropagation();
                                             setIsDragOver(false)
                                             setDraggedTaskId("")
                                         }}
                                         onDrop={(e) => {onDrop_container(e,task)}}
                                    >
                                        <div style={{display:"flex",marginLeft:20,justifyContent:"space-between"}}>
                                            <h6>{'#Fichiers'}</h6>
                                            <NoteAddIcon color="primary" fontSize="small" style={{marginTop:5,marginRight:3,cursor:"pointer"}}
                                                         onClick={(e) => {setAnchorElFiles(e.currentTarget)}}
                                            />
                                        </div>

                                        <div style={{padding:10,marginLeft:20,marginBottom:10,marginRight:15}}>
                                            {
                                                (task.files || []).length > 0 &&
                                                <div style={{width:"100%",display:"flex",marginBottom:10}}>
                                                    <div style={{minWidth:"20%"}}/>
                                                    <div style={{minWidth:"15%"}}><h6>Ajouté par</h6></div>
                                                    <div style={{minWidth:"10%"}}><h6>Leader</h6></div>
                                                    <div style={{minWidth:"40%"}}><h6>Equipe</h6></div>
                                                    <div style={{minWidth:"15%",marginRight:30}}><h6>Ajouté le</h6></div>
                                                </div>
                                            }
                                            {
                                                (task.files || []).map((file, key) => (
                                                    <div key={key} style={{border:"1px solid #f0f0f0",borderRadius:7.5,width:"100%",display:"flex",marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,.25)"}}>
                                                        <div style={{display:"flex",minWidth:"20%",alignItems:"center"}}>
                                                            <IconButton size="small"
                                                                        onClick={() => props.openPdfModal(file.id_in_ged)}
                                                            >
                                                                <DescriptionIcon color="error"/>
                                                            </IconButton>
                                                            <h6 style={{fontSize:"smaller",maxWidth:130}}>{file.name_in_ged}</h6>
                                                        </div>
                                                        <div style={{minWidth:"15%",alignSelf:"center"}}>
                                                            <h6>{file.added_by.id === "" ? file.added_by.email : main_functions.getContactFnameById(props.contacts,file.added_by.id)}</h6>
                                                        </div>
                                                        <div style={{minWidth:"10%",alignSelf:"center"}}>

                                                            <GreenCheckbox checked={file.leader_validation ? file.leader_validation === "true" : false }
                                                                           size="small"
                                                                           onChange={(e) => {
                                                                               if(task.leader.email === localStorage.getItem("email")){
                                                                                   if(file.leader_validation === "false") file.leader_validation = "true"
                                                                                   else file.leader_validation = "false"
                                                                                   rethink.update("test",'table("rooms").get('+JSON.stringify(props.room.id)+').update('+ JSON.stringify(props.room) + ')',db_name,false).then( updateRes => {
                                                                                       if (updateRes && updateRes === true) {
                                                                                           console.log("UPDATE TASK OK")
                                                                                           props.setSelectedRoom(props.room)
                                                                                       } else {
                                                                                           console.log("ERROR UPDATE TASK")
                                                                                       }
                                                                                   }).catch(err => {
                                                                                       console.log("ERROR UPDATE TASK")
                                                                                       console.log(err)
                                                                                   })
                                                                               }else{
                                                                                   alert("Vous n'avez pas le droit d'effectuer cette opération !")
                                                                               }
                                                                           }}
                                                            />
                                                        </div>
                                                        <div style={{minWidth:"40%",alignSelf:"center"}}>
                                                            <div style={{display:"flex",flexWrap:"wrap"}}>
                                                                {
                                                                    (file.team_validation || []).map((item,key) => (
                                                                        <div key={key} style={{display:"flex"}}>
                                                                            <GreenCheckbox
                                                                                checked={item.validation ? item.validation === "true" : false}
                                                                                onChange={(e) => {
                                                                                    if(item.email === localStorage.getItem("email")){
                                                                                        if(item.validation === "false") item.validation = "true"
                                                                                        else item.validation = "false"
                                                                                        rethink.update("test",'table("rooms").get('+JSON.stringify(props.room.id)+').update('+ JSON.stringify(props.room) + ')',db_name,false).then( updateRes => {
                                                                                            if (updateRes && updateRes === true) {
                                                                                                props.setSelectedRoom(props.room)
                                                                                            } else {
                                                                                                console.log("ERROR UPDATE TASK")
                                                                                            }
                                                                                        }).catch(err => {
                                                                                            console.log("ERROR UPDATE TASK")
                                                                                            console.log(err)
                                                                                        })
                                                                                    }else{
                                                                                        alert("Vous n'avez pas le droit d'effectuer cette opération !")
                                                                                    }
                                                                                }}
                                                                                size="small"
                                                                            />
                                                                            <h6 style={{marginTop:12}}>{item.id === "" ? item.email : main_functions.getContactFnameById(props.contacts,item.id)}</h6>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                        <div style={{minWidth:"15%",width:"100%",alignSelf:"center"}}>
                                                            <h6>{file.added_at}</h6>
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <div>
                                            {
                                                (task.tags || []).map((tag,key) => (
                                                    <span key={key} className="badge badge-light p-1" style={{color:"cadetblue",marginRight:2}}>{tag}</span>
                                                ))
                                            }
                                        </div>
                                        <div>
                                            <span className="badge badge-warning text-white p-1">{task.date_deadline}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>


                </div>
            </TabPanel>

            <TabPanel value={props.selectedRoomTab} index={3} >
                <div style={{margin:20}}>
                    <Board
                        style={{backgroundColor:"skyblue"}}
                        draggable
                        cardDragClass="draggingCard"
                        laneDragClass="draggingLane"
                        canAddLanes={true}
                        editable
                        data={{
                            lanes: [
                                {
                                    id: 'lane1',
                                    title: 'Planned Tasks',
                                    label: '2/2',
                                    cards: [
                                        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
                                        {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
                                    ]
                                },
                                {
                                    id: 'lane2',
                                    title: 'Completed',
                                    label: '0/0',
                                    cards: []
                                }
                            ]
                        }}
                    />
                </div>

            </TabPanel>

            {/*<TabPanel index={4} value={props.selectedRoomTab}>
                <div style={{marginTop:25}}>
                    <audio controls src={audioURL} />
                    <AudioPlayer
                        autoPlay={false}
                        src={audioURL}
                        onPlay={e => console.log("onPlay")}
                        showSkipControls={false}
                        showJumpControls={false}
                        autoPlayAfterSrcChange={false}
                        showFilledVolume={false}
                    />
                    <button onClick={startRecording} disabled={isRecording}>
                        start recording
                    </button>
                    <button onClick={stopRecording} disabled={!isRecording}>
                        stop recording
                    </button>
                </div>

            </TabPanel>*/}

            <Popover
                style={{zIndex:0,position:"unset"}}
                id={id}
                open={openFilesPopup}
                anchorEl={anchorElFiles}
                onClose={() => {
                    setAnchorElFiles(null)
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
                <div style={{padding:15,height:600,width:300,paddingBottom:50}}>
                    <div align="right">
                        <IconButton size="small" onClick={() => {setAnchorElFiles(null)}}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <h6 style={{color:"darkblue"}}>Glisser et affecter des fichiers à cette tache</h6>
                    <div style={{marginTop:30}}>
                        <DirectoryTree
                            draggable={true}
                            allowDrop={(options) => {
                                return false
                            }}
                            showIcon={true}
                            onExpand={onExpand}
                            onSelect={onSelect}
                            treeData={props.miniDrive}
                            expandAction="click"
                            expandedKeys={expandedKeys}
                            selectedKeys={selectedKeys}
                            onDragStart={e => {
                                let file = {id:e.node.key,name:e.node.title,typeF:e.node.typeF}
                                console.log(file)
                                e.event.dataTransfer.setData("file", JSON.stringify(file))
                            }}
                            autoExpandParent={autoExpandParent}
                        />
                    </div>
                </div>
            </Popover>


            <Dialog
                open={openNewTaskModal}
                onClose={() => {
                    setOpenNewTaskModal(false);
                }}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle disableTypography id="form-dialog-title">
                    <Typography variant="h6">Nouvelle tâche</Typography>
                    <IconButton
                        aria-label="close"
                        style={{
                            position: 'absolute',
                            right: 5,
                            top: 5,
                            color: '#c0c0c0'
                        }}
                        onClick={() => {
                            setOpenNewTaskModal(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="mt-2">
                        <div className="row mt-2">
                            <div className="col-lg-4">
                                <div style={{display:"grid"}}>
                                    <h6>Leader</h6>
                                    {
                                        selectedAssign === "" ?
                                            <Chip style={{backgroundColor:"#fff",maxWidth:150}}
                                                  icon={<PersonAddIcon fontSize="small" />}
                                                  label="Attribuer"
                                                  variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}
                                            /> :
                                            <Chip style={{backgroundColor:"#fff",maxWidth:180}}
                                                  avatar={<Avatar src={main_functions.getContactImageById(props.contacts,selectedAssign.id)} />}
                                                  label={selectedAssign.id === "" ? selectedAssign.email : main_functions.getContactFnameById(props.contacts,selectedAssign.id)}
                                                  variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}
                                            />
                                    }

                                    <Menu
                                        id="add-person-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        {
                                            (props.room.members || []).map((membre,key) =>
                                                <MenuItem key={key}  onClick={() => {
                                                    setAnchorEl(null);
                                                    setSelectedAssign(membre)
                                                }}  >
                                                    <ListItemIcon>
                                                        <Avatar src={main_functions.getContactImageById(props.contacts,membre.id)} />
                                                    </ListItemIcon>
                                                    <Typography variant="inherit">
                                                        {main_functions.getContactFnameById(props.contacts,membre.id) === "" ? membre.email : main_functions.getContactFnameById(props.contacts,membre.id)}
                                                    </Typography>
                                                </MenuItem>
                                            )
                                        }
                                    </Menu>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <h6>Client(facultatif)</h6>
                                <Dropdown
                                    value={newTaskClient}
                                    clearable
                                    labeled
                                    placeholder={"Chercher..."}
                                    search
                                    selection
                                    options={
                                        (props.annuaire_clients_mandat || []).map(({ Nom,Prenom, Type,id, imageUrl }) =>
                                            ({
                                                key: id,
                                                text: Type === "0" ? Nom : Nom + " " + Prenom ,
                                                value: id,
                                                image: {avatar:true,src:imageUrl ? imageUrl : Type === "0" ? entIcon : userAvatar}
                                            }))
                                    }
                                    onChange={ (e,{value}) => {
                                        setNewTaskClient(value)
                                    }}
                                    noResultsMessage="aucun résultat trouvé"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div style={{display:"grid"}}>
                                    <h6>Team</h6>
                                    <Dropdown
                                        value={teamEmails}
                                        className="custom-dropdown-width"
                                        multiple
                                        search
                                        clearable
                                        placeholder={""}
                                        noResultsMessage='Aucun utilisateur trouvé'
                                        selection
                                        fluid
                                        options={
                                            (props.room.members || []).map((item,key) =>
                                                ({
                                                    key: key,
                                                    text: item.id === "" ? item.email : main_functions.getContactFnameById(props.contacts,item.id),
                                                    value:item.email,
                                                    image: {avatar:true,src: item.id === "" ? userAvatar : main_functions.getContactImageById(props.contacts,item.id)}
                                                }))
                                        }
                                        onChange={(e,{value}) => {
                                            console.log(value)
                                            setTeamEmails(value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <h6>Titre</h6>
                                <Textfield value={newTaskTitle} onChange={(e) => {
                                    setnewTaskTitle(e.target.value)
                                }}
                                />
                            </div>
                            <div className="col-lg-4">
                                <h6>Priorité</h6>
                                <Dropdown
                                    value={newTaskPriority}
                                    onChange={(e,{value}) => {
                                        setNewTaskPriority(value)
                                    }}
                                    placeholder=''
                                    labeled
                                    selection
                                    options={[
                                        {key:0,value:"0",text:"Faible",label: { color: 'grey', empty: true, circular: true }},
                                        {key:1,value:"1",text:"Normal",label: { color: 'blue', empty: true, circular: true }},
                                        {key:2,value:"2",text:"Elevée",label: { color: 'red', empty: true, circular: true }},
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h6>Description</h6>
                                    <textarea
                                        className="form-control "
                                        id="*/*"
                                        style={{ width: '100%',border:"1px solid rgba(34,36,38,.15)",borderRadius:"0.285714rem" }}
                                        name="*/*"
                                        rows={4}
                                        value={newTaskDesc}
                                        onChange={(e) => {
                                            setNewTaskDesc(e.target.value)
                                        }} />
                                </div>
                                <div className="col-lg-4">
                                    <div style={{display:"grid"}}>
                                        <h6>Date échéance</h6>
                                        <Chip style={{backgroundColor:"#fff",maxWidth:180}} onClick={() => {
                                            setOpenDateTimePickerModal(true)
                                        }}
                                              icon={<InsertInvitationIcon fontSize="small" />} variant="outlined"
                                              label={selectedDateTime === "" ? "Date,heure" : selectedDateTime }
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <h6>Tags</h6>
                                <ReactTagInput
                                    tags={newTaskTags}
                                    placeholder="Tapez et appuyez sur Entrée"
                                    maxTags={20}
                                    editable={true}
                                    removeOnBackspace={true}
                                    onChange={(newTags) => setNewTaskTags(newTags)}
                                />
                            </div>
                        </div>


                    </div>
                </DialogContent>
                <DialogActions style={{ padding: 20 }}>
                    <MuiButton
                        onClick={() => {
                            setOpenNewTaskModal(false);
                        }}
                        color="primary"
                        style={{ textTransform: 'capitalize' }}
                    >
                        Annuler
                    </MuiButton>
                    <MuiButton
                        disabled={selectedAssign === "" || teamEmails.length === 0 || newTaskTitle.trim() === "" || selectedDateTime === ""}
                        onClick={() => {
                            props.addNewTask(newTaskTitle,newTaskDesc,selectedAssign,newTaskClient,teamEmails,newTaskPriority,newTaskTags,selectedDateTime)
                            setTimeout(() => {
                                setOpenNewTaskModal(false)
                                setTeamEmails([])
                                setNewTaskTags([])
                                setSelectedAssign("")
                                setNewTaskClient("")
                            },600)

                        }}
                        color="secondary"
                        variant="contained"
                        style={{ textTransform: 'capitalize' }}
                    >
                        Ajouter
                    </MuiButton>
                </DialogActions>
            </Dialog>


            <Dialog open={openDateTimePickerModal} onClose={() => {
                setOpenDateTimePickerModal(false)
            }} aria-labelledby="form-dialog-datetime" maxWidth="lg">
                <DialogContent>

                    <CalendyDateHourPicker times={Data.times} setSelectedDateTime={(dateTime) => {
                        setOpenDateTimePickerModal(false)
                        setSelectedDateTime(dateTime)
                    }} />

                </DialogContent>
            </Dialog>


            <Dialog open={openTeamModal} onClose={() => {
                setOpenTeamModal(false)
            }}
                    aria-labelledby="form-dialog-team"
            >
                <DialogTitle disableTypography id="form-dialog-team">
                    <Typography variant="h6">Team</Typography>
                    <IconButton aria-label="close"
                                style={{position: 'absolute', right: 5, top: 5, color: "#c0c0c0"}}
                                onClick={() => {
                                    setOpenTeamModal(false)
                                }}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-md-12" style={{marginTop: 25}}>
                            <div>
                                <Chips
                                    chips={[]}
                                    placeholder="Ajouter..."
                                    save={data => {
                                        setTeamEmails(data)
                                    }}
                                    pattern={data.emailPatern}
                                    limit={20}
                                    limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                                    contacts={props.contacts}

                                />
                            </div>
                        </div>

                        <div className="col-md-12" style={{marginTop: 20}}>
                            <FormControlLabel
                                control={<MuiCheckbox checked={teamCheck1}
                                                      onChange={() => setTeamCheck1(!teamCheck1)}
                                                      name="checkedteam1"
                                />}
                                label="Autoriser les personnes extérieures à votre organisation à rejoindre"
                            />
                        </div>
                        <div className="col-md-12">
                            <FormControlLabel
                                control={<MuiCheckbox checked={teamCheck2}
                                                      onChange={() => setTeamCheck2(!teamCheck2)}
                                                      name="checkedteam2"
                                />}
                                label="Notifier par e-mail"
                            />
                        </div>
                    </div>

                </DialogContent>
                <DialogActions style={{padding: 20}}>
                    <MuiButton onClick={() => {
                        setOpenTeamModal(false)
                    }} color="primary" style={{textTransform: "capitalize"}}>
                        Annuler
                    </MuiButton>
                    <MuiButton
                        disabled={teamEmails.length === 0}
                        onClick={() => {
                            setOpenTeamModal(false)
                        }}
                        color="primary" variant="contained" style={{textTransform: "capitalize"}}>
                        Valider
                    </MuiButton>
                </DialogActions>
            </Dialog>

            <ModalTransition>
                {openDeleteModal === true && (
                    <Modal
                        actions={[
                            { text: 'Supprimer', onClick: () => {

                                } },
                            { text: 'Annuler', onClick: () => {

                                    setOpenDeleteModal(false)
                                }},
                        ]}
                        onClose={() => {
                            setOpenDeleteModal(false)
                        }}
                        heading="Vous êtes sur le point de supprimer cette ligne !"
                        appearance="danger"
                    >

                    </Modal>
                )}
            </ModalTransition>

        </div>
    );
}