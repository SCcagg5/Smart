import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TablePatientsBrainy from "../Table/TablePatientsBrainy"
import { Route, Switch } from 'react-router-dom';
import TableClientNL from "../Table/TableClientNL";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',

    },
    appBar: {

        marginTop:90,
        ["@media (max-width:600px)"]:{
          marginTop:90
        },
        backgroundColor:"green",

        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginTop:90,
        ["@media (max-width:600px)"]:{
            marginTop:90
        },
        backgroundColor:"green",

        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        marginTop:90,
        ["@media (max-width:600px)"]:{
            marginTop:90
        },

        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        marginTop:90,
        ["@media (max-width:600px)"]:{
            marginTop:90
        },

        width: drawerWidth,
    },
    drawerHeader: {



        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,

        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onClickItem=(index)=>{
        if (index===0){
            props.history.push('/admin/clients')
        }else if (index===1){
            props.history.push('/admin/prospects')
        }
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                style={{marginTop:props.nav==="hidden"?0:90}}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{color:"white"}} variant="h6" noWrap>
                        Customer Quizz Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Mes clients', 'Mes prospects'].map((text, index) => (
                        <ListItem selected={props.onFocusItem===text} onClick={()=>{onClickItem(index)}}   button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>

                </List>
            </Drawer>
            <main
                style={{marginTop:props.nav==="hidden"?90:20}}
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div />
                <Switch>
                    <Route exact path="/admin/clients">
                        <TableClientNL  clients={props.clients}/>
                    </Route>
                    <Route exact path="/admin/prospects">
               <TablePatientsBrainy clients={props.prospects}/>
                    </Route>


                </Switch>

            </main>
        </div>
    );
}
