import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import React, {useState} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Popper from "@material-ui/core/Popper";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


export default function SignTopBar(props) {

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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
            <Toolbar style={{height:props.height}}>
                <IconButton edge="start" aria-label="menu" onClick={() => props.onBackBtnClick()}>
                    <ArrowBackIcon style={{fontSize:26}} />
                </IconButton>
                <div style={{cursor:"pointer",marginLeft:30,display:"flex"}} onClick={handleToggle} ref={anchorRef}
                     aria-controls={open ? 'menu-list-grow' : undefined}
                     aria-haspopup="true">
                    <img alt="" src={require('../../assets/images/autographe-30.png')}/>
                    <h5 style={{color:"#1ABC9C",marginLeft:5}}>Placer la signature</h5>
                </div>
                <h5 style={{position:"absolute",right:25}} >{props.title}</h5>
            </Toolbar>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper style={{width:240}}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" style={{marginTop:5}}>
                                    <MenuItem onClick={() => {
                                        setAnchorEl(null)
                                        props.showSignModal()
                                    }}>
                                        <ListItemIcon>
                                            <AddCircleOutlineIcon fontSize="large"/>
                                        </ListItemIcon>
                                        <Typography variant="inherit">Créer une signature</Typography>
                                    </MenuItem>
                                    {
                                        props.savedSignatures.map((item,key) =>
                                            <MenuItem key={key} onClick={() => {
                                                setAnchorEl(null)
                                                setOpen(false)
                                                props.onClickSignature(item)
                                            }}>
                                                <img alt="" src={item.data} style={{width:150,height:60}}/>
                                                <IconButton style={{marginLeft:23}} onClick={(e) => {
                                                    e.stopPropagation()
                                                    props.onClickDelete()
                                                }}>
                                                    <DeleteOutlineIcon fontSize="small" color="secondary"/>
                                                </IconButton>
                                            </MenuItem>
                                        )
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </AppBar>

    )
}