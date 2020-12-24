import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, Checkbox, Chip, Avatar, Checkbox as MuiCheckbox, Button as MuiButton} from "@material-ui/core";
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Grid from '@material-ui/core/Grid';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Data from "../../data/Data";
import CalendyDateHourPicker from "../Pickers/CalendyDateHourPicker";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Chips from "../EmailsInputChips/Chips";
import data from "../../data/Data";
import moment from "moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import RoomDocs from "../List/RoomDocs";
import CircularProgress from '@material-ui/core/CircularProgress';
//import SmartService from "../../provider/SmartService";
import SmartService from "../../provider/masterNodeService";
import entIcon from "../../assets/images/entreprise-icon.png";
import userAvatar from "../../assets/images/users/user4.jpg";
import Select from "react-select";
import Modal, {ModalTransition} from "@atlaskit/modal-dialog";


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

function renderSearchOption(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
        width: 32, height: 32, objectFit: "cover"
    };

    return (
        <button {...props} className={className} type="button">
            <span>
                <img alt="" style={imgStyle}
                     src={option.ContactType === "Person" ? option.imageUrl ? option.imageUrl : userAvatar : entIcon}/>
                <span style={{fontSize: 13}}>{option.ContactName}</span>
            </span>
        </button>
    );
}

export default function RoomTabs(props) {
    let inputDateRef = {}

    const [value, setValue] = React.useState(2);
    const [newTaskTitle, setnewTaskTitle] = React.useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl_annuaire, setAnchorEl_annuaire] = useState(null);
    const [selectedAssign, setSelectedAssign] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [openDateTimePickerModal, setOpenDateTimePickerModal] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState("");
    const [openTeamModal, setOpenTeamModal] = useState(false);
    const [teamEmails, setTeamEmails] = useState([]);
    const [anchorElContactsMenu, setAnchorElContactsMenu] = useState(null);
    const [teamCheck1, setTeamCheck1] = useState(false);
    const [teamCheck2, setTeamCheck2] = useState(true);
    const [loadindFiles, setloadingFiles] = useState(false);
    const [roomDocs, setRoomDocs] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);


    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue === 1){
            setloadingFiles(true)
            SmartService.getRoomFiles(localStorage.getItem("token"),localStorage.getItem("usrtoken"),props.room.id).then( res => {
                console.log(res)
                setRoomDocs(res.data)
                setloadingFiles(false)
            }).catch(err => {
                console.log(err)
            })
        }
    };

    const contactSelectOptions=[];
    contactSelectOptions.push({label:"Aucun",value:""})
    props.annuaire_clients.map((client,key) => {
        contactSelectOptions.push({value:client.contactName,
            label:<div><img alt="" src={client.Type === "1" ? client.imageUrl ? client.imageUrl : userAvatar : entIcon}
                            style={{width:30,height:30,objectFit:"cover"}}/>{client.contactName}</div>
        })
    })

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="room tabs ">
                <Tab label="Chat" {...a11yProps(0)} style={{fontWeight:600,textTransform:"capitalize"}} disabled={true} />
                <Tab label="Fichiers" {...a11yProps(1)} style={{fontWeight:600,textTransform:"capitalize"}} disabled={true} />
                <Tab label="Tâches" {...a11yProps(2)} style={{fontWeight:600,textTransform:"capitalize"}} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:-2}}/>
            </TabPanel>

            <TabPanel value={value} index={1}>
                {
                    loadindFiles === true ?
                    <div align="center" style={{marginTop:80}}>
                        <CircularProgress color="secondary" />
                    </div> :

                        <RoomDocs docs={roomDocs} onDocClick={(doc) => {}}
                                  onDropFile={(node) => {
                                      console.log(node)
                                      if(node.typeF === "file"){
                                          setloadingFiles(true)
                                          console.log(node.key)
                                          SmartService.addFileInRoom({doc_id:node.key},props.room.id,
                                              localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( r => {
                                                  console.log(r)
                                              SmartService.getRoomFiles(localStorage.getItem("token"),localStorage.getItem("usrtoken"),props.room.id).then( res => {
                                                  setRoomDocs(res.data)
                                                  setloadingFiles(false)
                                              }).catch(err => {
                                                  console.log(err)
                                              })

                                          }).catch(err => {
                                              console.log(err)
                                          })
                                      }else{
                                          alert("Type de fichier erroné !")
                                      }

                                  }}
                        />
                }


            </TabPanel>

            <TabPanel value={value} index={2}>
                <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:-2}}/>
                <div style={{marginTop:45}}>
                    <Grid container spacing={1} style={{flexWrap:"nowrap"}}>
                        <Grid item xs={3} style={{minWidth:250}}>
                            <h5 style={{color:"grey"}}>Titre</h5>
                        </Grid>
                        <Grid item xs={2} style={{minWidth:200}}>
                            <h5 style={{color:"grey"}}>Date</h5>
                        </Grid>
                        <Grid item xs={showAddForm === true ? 3 : 2} style={{minWidth:250}}>
                            <h5 style={{color:"grey"}}>Client Attribution</h5>
                        </Grid>
                        <Grid item xs={2} style={{minWidth:250}}>
                            <h5 style={{color:"grey"}}>Lead</h5>
                        </Grid>
                        <Grid item xs={showAddForm === true ? 1 : 2} style={{minWidth:250}}>
                            <h5 style={{color:"grey"}}>Team</h5>
                        </Grid>
                        <Grid item xs={1} style={{minWidth:150}}/>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button
                                variant="text" onClick={() => setShowAddForm(true)}
                                style={{textTransform:"none",backgroundColor:"transparent",color:"#1a73e8"}}
                                startIcon={<LibraryAddCheckIcon style={{color:"#1a73e8"}} />}
                            >
                                Ajouter une tâche
                            </Button>
                            <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:10,width:1450}}/>
                            {
                                showAddForm === true &&
                                <div style={{width:1450,backgroundColor:"#f0f0f0"}}>
                                    <Grid container spacing={1} style={{flexWrap:"nowrap"}} >
                                        <Grid item xs={3} style={{minWidth:250,maxWidth:250}}>
                                                <TextField id="msg-notif" label="" variant="filled" value={newTaskTitle}
                                                           onChange={(event)=> setnewTaskTitle(event.target.value)}
                                                           multiline rows={2} style={{width:"95%",marginLeft:3}}
                                                />
                                        </Grid>
                                        <Grid item xs={2} style={{minWidth:200,maxWidth:200}}>
                                            <Chip style={{backgroundColor:"#fff",marginTop:55}} onClick={() => {
                                                setOpenDateTimePickerModal(true)
                                            }}
                                                  icon={<InsertInvitationIcon fontSize="small" />}
                                                  label={selectedDateTime === "" ? "Ajouter Date,heure" : selectedDateTime }
                                            />
                                        </Grid>
                                        <Grid item xs={3} style={{minWidth:250,maxWidth:250}}>
                                            <Select
                                                defaultValue={selectedClient}
                                                options={contactSelectOptions}
                                                closeMenuOnSelect={true}
                                                isMulti={false}
                                                hideSelectedOptions={true}
                                                styles={{
                                                    container: (provided, state) => ({
                                                        ...provided,
                                                        width:220,marginTop:53,marginRight: 3
                                                    }),
                                                    menuPortal: styles => ({ ...styles, zIndex: 9999 })
                                                }}
                                                menuPortalTarget={document.body}
                                                onChange={(e) => {
                                                    setSelectedClient(e.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2} style={{minWidth:250,maxWidth:250}}>
                                            {
                                                selectedAssign === "" ?
                                                    <Chip style={{backgroundColor:"#fff",marginTop:55,maxWidth:150}}
                                                          icon={<PersonAddIcon fontSize="small" />}
                                                          label="Attribuer"
                                                          variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}
                                                    /> :
                                                    <Chip style={{backgroundColor:"#fff",marginTop:55,maxWidth:150}}
                                                          avatar={<Avatar src={selectedAssign.imageUrl} />}
                                                          label={selectedAssign.prenom+" "+selectedAssign.nom}
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
                                                    props.contacts.map((contact,key) =>
                                                        <MenuItem key={key}  onClick={() => {
                                                            setAnchorEl(null);
                                                            setSelectedAssign(contact)
                                                        }}  >
                                                            <ListItemIcon>
                                                                <Avatar src={contact.imageUrl} />
                                                            </ListItemIcon>
                                                            <Typography variant="inherit">{contact.prenom+" "+contact.nom}</Typography>
                                                        </MenuItem>
                                                    )
                                                }
                                            </Menu>

                                        </Grid>
                                        <Grid item xs={1} style={{minWidth:150,maxWidth:150}}>
                                            {
                                                teamEmails.length === 0 && openTeamModal === false ?
                                                    <Chip style={{backgroundColor:"#fff",marginTop:55}}
                                                          icon={<PersonAddIcon fontSize="small" />}
                                                          label="Attribuer"
                                                          variant="outlined" onClick={(event) => setOpenTeamModal(true)}
                                                    /> :

                                                    <AvatarGroup style={{marginTop:55}} max={4} spacing="medium" onClick={() => setOpenTeamModal(true) }>
                                                        {
                                                            teamEmails.map((item,key) =>
                                                                <Avatar key={key} alt="" src={item.avatar} title={item.fname} />
                                                            )
                                                        }
                                                    </AvatarGroup>
                                            }

                                        </Grid>
                                        <Grid item xs={1}/>
                                    </Grid>
                                    <div className="row" style={{marginTop:20}}>
                                        <div className="col-md-12" style={{paddingLeft:50,marginBottom:20}}>
                                            <Button
                                              disabled={newTaskTitle === "" || selectedDateTime === "" || selectedAssign === "" || teamEmails.length === 0  }
                                              onClick={() => {
                                                setShowAddForm(false)
                                                  props.addNewTask(newTaskTitle,selectedClient,selectedAssign,teamEmails,selectedDateTime)
                                                setSelectedAssign("")
                                                setnewTaskTitle("")
                                                setTeamEmails([])
                                                setSelectedDateTime("")
                                            }} variant="contained" size="small"
                                                    style={{textTransform:"capitalize",
                                                        backgroundColor:(newTaskTitle === "" || selectedDateTime === "" || selectedAssign === "" || teamEmails.length === 0) ? "#d3d3d3" : "#2196f3",
                                                        color:"#fff",fontWeight:"bold"}}>
                                                Ajouter
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setShowAddForm(false)
                                                    setSelectedAssign("")
                                                    setnewTaskTitle("")
                                                    setTeamEmails([])
                                                    setSelectedDateTime("")
                                                }}
                                                color="default" variant="text" size="small" style={{textTransform:"capitalize",fontWeight:"bold"}}>
                                                Annuler
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Grid>
                    </Grid>

                        {
                            [].concat(props.room.tasks || []).reverse().map((task,key) =>
                                <Grid key={key} container spacing={1} style={{flexWrap:"nowrap"}}>
                                    <Grid item xs={3} style={{minWidth:250}}>
                                        <div  style={{padding:"15px 20px",display:"flex"}}>
                                            <Checkbox
                                                icon={<RadioButtonUncheckedIcon/>}
                                                defaultChecked={false}
                                                disabled={true}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            <h5 style={{marginTop:13}}>{task.title}</h5>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} style={{minWidth:200}}>
                                        <div style={{padding:"20px 0"}}>
                                            <Chip style={{backgroundColor:"#fff"}} onClick={() => {

                                            }}
                                                  icon={<InsertInvitationIcon fontSize="small" />}
                                                  label={task.dateTime || "non défini"}
                                                  variant="outlined"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} style={{minWidth:250}}>
                                        <h5 style={{marginTop:25}}>{task.clientAttribution}</h5>
                                    </Grid>
                                    <Grid item xs={2} style={{minWidth:250}}>
                                        <div style={{padding:"20px 0"}}>
                                            <Chip style={{backgroundColor:"#fff",maxWidth:150}}
                                                  avatar={<Avatar src={task.assignedTo.imageUrl} />}
                                                  label={task.assignedTo.prenom+" "+task.assignedTo.nom}
                                                  variant="outlined"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} style={{minWidth:250}}>
                                        <AvatarGroup style={{marginTop:20}} max={4} spacing="medium">
                                            {
                                                (task.team || []).map((item,key) =>
                                                    <Avatar key={key} alt="" src={item.avatar} title={item.fname} />
                                                )
                                            }
                                        </AvatarGroup>
                                    </Grid>
                                    <Grid item xs={1} style={{minWidth:150}}>
                                        {/*<IconButton aria-label="Supprimer" title="Supprimer" color="default" style={{marginTop:12}}
                                                    onClick={() => {

                                                        setOpenDeleteModal(true)
                                                    }}
                                        >
                                            <DeleteOutlineIcon color="secondary"/>
                                        </IconButton>*/}
                                    </Grid>
                                    <Grid item xs={12} >
                                        <div style={{backgroundColor:"#f0f0f0",height:2}}/>
                                    </Grid>
                                </Grid>
                            )
                        }


                </div>
            </TabPanel>

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
                                    chips={teamEmails}
                                    placeholder="Ajouter les membres"
                                    save={data => {
                                        console.log(data)
                                        setTeamEmails(data)
                                    }}
                                    pattern={data.emailPatern}
                                    requiredMessage={"Email incorrect"}
                                    required={true}
                                    limit={20}
                                    limitMessage="Vous avez atteint le nombre maximal d'e-mails"
                                    onInputClick={(event) => {
                                        setAnchorElContactsMenu(event.currentTarget)
                                    }}

                                />
                                <Menu
                                    id="add-person-room--menu"
                                    anchorEl={anchorElContactsMenu}
                                    keepMounted
                                    open={Boolean(anchorElContactsMenu)}
                                    onClose={() => setAnchorElContactsMenu(null)}
                                >
                                    {
                                        props.contacts.map((contact, key) =>
                                            <MenuItem key={key} onClick={() => {
                                                let emails = teamEmails;
                                                emails.push({
                                                    email: contact.email,
                                                    valid: true,
                                                    key: parseInt(moment().format("DDMMYYYYHHmmss")),
                                                    avatar:contact.imageUrl || "",
                                                    fname:contact.prenom +" "+contact.nom
                                                })
                                                setAnchorElContactsMenu(null)
                                                setTeamEmails(emails)
                                            }}>
                                                <ListItemIcon>
                                                    <Avatar src={contact.imageUrl}/>
                                                </ListItemIcon>
                                                <Typography
                                                    variant="inherit">{contact.prenom + " " + contact.nom}</Typography>
                                            </MenuItem>
                                        )
                                    }
                                </Menu>
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