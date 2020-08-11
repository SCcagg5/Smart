import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, Checkbox, Chip,Avatar} from "@material-ui/core";
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

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
    let inputDateRef = {}

    const [value, setValue] = React.useState(2);
    const [newTaskTitle, setnewTaskTitle] = React.useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAssign, setSelectedAssign] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="room tabs ">
                <Tab label="Chat" {...a11yProps(0)} style={{fontWeight:600,textTransform:"capitalize"}} />
                <Tab label="Fichiers" {...a11yProps(1)} style={{fontWeight:600,textTransform:"capitalize"}} />
                <Tab label="Tâches" {...a11yProps(2)} style={{fontWeight:600,textTransform:"capitalize"}} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:-2}}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:-2}}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:-2}}/>
                <div style={{marginTop:20}}>
                    <div className="row">
                        <div className="col-md-6">
                            <h5 style={{color:"#c0c0c0"}}>Titre</h5>
                        </div>
                        <div className="col-md-3">
                            <h5 style={{color:"#c0c0c0"}}>Date</h5>
                        </div>
                        <div className="col-md-3">
                            <h5 style={{color:"#c0c0c0"}}>Cessionnaire</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{marginTop:15}}>
                            <Button
                                variant="text" onClick={() => setShowAddForm(true)}
                                style={{textTransform:"none",backgroundColor:"transparent",color:"#1a73e8"}}
                                startIcon={<LibraryAddCheckIcon style={{color:"#1a73e8"}} />}
                            >
                                Ajouter une tâche
                            </Button>
                            <div style={{backgroundColor:"#f0f0f0",height:2,marginTop:10}}/>
                            {
                                showAddForm === true &&
                                <div style={{width:"100%",backgroundColor:"#f0f0f0"}}>
                                    <div className="row">
                                        <div className="col-md-1" style={{padding:"30px 20px"}}>
                                            <Checkbox
                                                icon={<RadioButtonUncheckedIcon/>}
                                                defaultChecked={false}
                                                disabled={true}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <TextField id="msg-notif" label="" variant="filled" value={newTaskTitle}
                                                       onChange={(event)=> setnewTaskTitle(event.target.value)}
                                                       multiline rows={2} style={{width:"100%"}}
                                            />
                                        </div>
                                        <div className="col-md-3" style={{padding:"30px 0"}}>
                                            <Chip style={{backgroundColor:"#fff"}} onClick={() => {

                                            }}
                                                  icon={<InsertInvitationIcon fontSize="small" />}
                                                  label="Ajouter Date,heure"
                                                  variant="outlined"
                                            />
                                        </div>
                                        <div className="col-md-3" style={{padding:"30px 0"}}>
                                            {
                                                selectedAssign === "" ?
                                                    <Chip style={{backgroundColor:"#fff"}}
                                                          icon={<PersonAddIcon fontSize="small" />}
                                                          label="Attribuer"
                                                          variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}
                                                    /> :
                                                    <Chip style={{backgroundColor:"#fff"}}
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
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{paddingLeft:50,marginBottom:20}}>
                                            <Button onClick={() => {
                                                setShowAddForm(false)
                                                setSelectedAssign("")
                                                setnewTaskTitle("")
                                                props.addNewTask(newTaskTitle,selectedAssign)
                                            }} variant="contained" size="small"
                                                    style={{textTransform:"capitalize",backgroundColor:"#2196f3",color:"#fff",fontWeight:"bold"}}>
                                                Ajouter
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setShowAddForm(false)
                                                }}
                                                color="default" variant="text" size="small" style={{textTransform:"capitalize",fontWeight:"bold"}}>
                                                Annuler
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                props.room.tasks && props.room.tasks.map((task,key) =>
                                    <div key={key}>
                                        <div className="row">
                                            <div className="col-md-1" style={{padding:"15px 20px"}}>
                                                <Checkbox
                                                    icon={<RadioButtonUncheckedIcon/>}
                                                    defaultChecked={false}
                                                    disabled={true}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </div>
                                            <div className="col-md-5" style={{padding:"20px 0"}}>
                                                <h5>{task.title}</h5>
                                            </div>
                                            <div className="col-md-3" style={{padding:"20px 0"}}>
                                                <Chip style={{backgroundColor:"#fff"}} onClick={() => {

                                                }}
                                                      icon={<InsertInvitationIcon fontSize="small" />}
                                                      label={task.date || "non défini"}
                                                      variant="outlined"
                                                />
                                            </div>
                                            <div className="col-md-3" style={{padding:"20px 0"}}>
                                                <Chip style={{backgroundColor:"#fff"}}
                                                      avatar={<Avatar src={task.assignedTo.imageUrl} />}
                                                      label={task.assignedTo.prenom+" "+task.assignedTo.nom}
                                                      variant="outlined"
                                                />
                                            </div>
                                        </div>
                                        <div style={{backgroundColor:"#f0f0f0",height:2}}/>
                                    </div>

                                )
                            }

                        </div>
                    </div>
                </div>
            </TabPanel>
        </div>
    );
}