import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Avatar from '@material-ui/core/Avatar';
import utilFunctions from "../../tools/functions";
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function TopBar(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return(
        <AppBar position="fixed" color="default" className="fe-ai" >
            <Toolbar style={{height:props.height}} onAuxClick={event => event.preventDefault()}>
                <IconButton edge="start" aria-label="menu" onClick={props.onClickMenuIcon}>
                    <MenuIcon style={{fontSize:26}} />
                </IconButton>
                <img alt="" src={props.logo} style={{height:50,marginLeft:10}}/>
                <SearchBar style={{marginLeft:110,width:700,marginTop:3}}
                    value={""}
                           placeholder="Rechercher"
                    onChange={(newValue) => {}}
                    onRequestSearch={() => {}}
                />
                <div style={{position:"absolute",right:10}}>
                    <Avatar onClick={handleToggle} ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true" style={{width:40,height:40,cursor:"pointer",fontWeight:"bold",
                        backgroundColor:utilFunctions.getCharColor(localStorage.getItem("email").charAt(0))}}>
                        {localStorage.getItem("email").charAt(0).toUpperCase()}

                    </Avatar>
                </div>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper style={{width:220}}>
                                <div align="center" style={{marginTop:10}}>
                                    <Avatar  style={{fontWeight:"bold",width:45,height:45,top:15,marginBottom:15,
                                        backgroundColor:utilFunctions.getCharColor(localStorage.getItem("email").charAt(0))}}>
                                        {localStorage.getItem("email").charAt(0).toUpperCase()}
                                    </Avatar>
                                    <p>{localStorage.getItem("email")}</p>
                                </div>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" style={{marginTop:-15}}>
                                        <MenuItem onClick={() => {}}>Mon profil</MenuItem>
                                        <MenuItem onClick={() => {}}>Paramètres</MenuItem>
                                        <MenuItem onClick={props.onLogoutClick}>Déconnexion</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Toolbar>
        </AppBar>
    )
}