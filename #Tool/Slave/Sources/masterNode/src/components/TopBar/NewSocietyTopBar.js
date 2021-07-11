import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import React, {useState} from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function NewSocietyTopBar(props) {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return(
        <AppBar position="fixed" color="default" className="fe-ai" >
            <Toolbar style={{height:props.height}}>
                <IconButton edge="start" aria-label="menu" onClick={() => props.onBackBtnClick()}>
                    <ArrowBackIcon style={{fontSize:26}} />
                </IconButton>
                <div style={{marginLeft:30,display:"flex"}} ref={anchorRef}
                     aria-controls={open ? 'menu-list-grow' : undefined}
                     aria-haspopup="true">
                    <img alt="" src={require('../../assets/images/company.png')} style={{width:50,height:50}}/>
                    <h5 style={{color:"cornflowerblue",marginLeft:5,alignSelf:"center"}}>Nouvelle société</h5>
                </div>
                {/*<h5 style={{position:"absolute",right:25}} >{props.title}</h5>*/}
            </Toolbar>
        </AppBar>

    )
}