import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



export default function NewRecTopBar(props) {


    return(
        <AppBar position="fixed" color="default" className="fe-ai" >
            <Toolbar style={{height:props.height}}>
                <IconButton edge="start" aria-label="menu" onClick={() => props.onBackBtnClick()}>
                    <ArrowBackIcon style={{fontSize:26}} />
                </IconButton>
                <h4 style={{position:"absolute",left:65,marginTop:-1}} >{props.title}</h4>
            </Toolbar>
        </AppBar>

    )
}