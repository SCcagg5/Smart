import Drawer from "@material-ui/core/Drawer";
import React from "react";
import "./style.css"

const logo = localStorage.getItem("logo")
const email = localStorage.getItem("email")

export default function SideMenu(props) {

    return(
        <Drawer anchor="left" open={props.opened} onClose={props.onClose} style={{backgroundColor:"#f5f5f5"}}>
            <div  style={{padding:15,width:300,marginLeft:15}}>
                <img alt="" src={props.logo} style={{height:150,width:250,objectFit:"contain"}}/>
            </div>

            <div style={{marginTop:30}}>
            </div>
            <div style={{position:"absolute",bottom:"1.3%",width:300}}>
                <hr style={{border:"1px solid #f0f0f0"}}/>
                <div className="menu-item">
                    <i className="fe-help-circle" style={{fontSize:24,color:"green",marginLeft:20}}/>
                    <div style={{color:"#000",fontSize:"1.05rem",fontWeight:700,marginLeft:25}}>Aide</div>
                </div>
                <hr style={{border:"1px solid #f0f0f0"}}/>
                <div className="menu-item">
                    <i className="fe-user" style={{fontSize:24,color:"blue",marginLeft:20}}/>
                    <div style={{color:"#000",fontSize:"1.05rem",fontWeight:"normal",marginLeft:25}}>
                        {"Mon profil"}
                    </div>
                </div>
                <hr style={{border:"1px solid #f0f0f0"}}/>
                <div className="menu-item" onClick={()=> {
                    let logoCp = logo
                    let emailCp = email
                    localStorage.clear();
                    localStorage.setItem("logo",logoCp)
                    localStorage.setItem("email",emailCp)
                    setTimeout(() => {
                        window.location.reload()
                    },250)
                }}>
                    <i className="fe-log-out" style={{fontSize:24,color:"red",marginLeft:20}}/>
                    <div style={{color:"#000",fontSize:"1.05rem",fontWeight:700,marginLeft:25}}>Déconnexion</div>
                </div>
            </div>
        </Drawer>
    )

}