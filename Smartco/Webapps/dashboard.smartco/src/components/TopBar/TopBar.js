import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";


export default function TopBar(props) {

    return(
        <AppBar position="static" color="transparent" className="fe-ai">
            <Toolbar style={{height:props.height}}>
                <IconButton edge="start" aria-label="menu" style={{marginTop:15}} onClick={props.onClickMenuIcon}>
                    <MenuIcon color="blue" style={{fontSize:38}} />
                </IconButton>
                <img alt="" src={props.logo} style={{height:60,marginLeft:70}}/>
                {
                    props.windowWidth >= 700 &&
                    <div style={{marginLeft:60,marginTop:5}} className="input_search_container">
                        <div className="left_icon">
                            <i className="fe-search"/>
                        </div>
                        <input className="form-control input_search" placeholder="Chercher un document"/>
                    </div>
                }

                {/*<h6 onClick={props.onClickMyCf} style={{position:"absolute",right:20,fontSize:18,cursor:"pointer"}}>Mon coffre fort</h6>*/}
            </Toolbar>
        </AppBar>
    )
}