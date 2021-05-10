import logo from "../../assets/images/logos/OALegalLogoV2.jpeg";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import "./style.css"


export default function SideMenu(props) {

    return(
        <Drawer anchor="left" open={props.opened} onClose={props.onClose} style={{backgroundColor:"#f5f5f5"}}>
            <div align="center"  style={{padding:15,width:300,marginTop:30}}>
                <img alt="" src={logo} style={{height:100,width:180,objectFit:"contain"}}/>
            </div>
            <div style={{position:"absolute",bottom:"1.3%",width:300}}>
                <hr style={{border:"1px solid #f0f0f0"}}/>
                <div className="menu-item">
                    <i className="fe-help-circle" style={{fontSize:24,color:"green",marginLeft:20}}/>
                    <div style={{color:"#000",fontSize:"1.05rem",fontWeight:700,marginLeft:25}}>Aide</div>
                </div>
                {/*<hr style={{border:"1px solid #f0f0f0"}}/>
                <div className="menu-item">
                    <i className="fe-user" style={{fontSize:24,color:"blue",marginLeft:20}}/>
                    <div style={{color:"#000",fontSize:"1.05rem",fontWeight:"normal",marginLeft:25}}>
                        {"Mon profil"}
                    </div>
                </div>*/}
                <hr style={{border:"1px solid #f0f0f0"}}/>
                <div className="menu-item" onClick={()=> {
                    let emailCp = localStorage.getItem("email")
                    localStorage.clear();
                    localStorage.setItem("email",emailCp)
                    props.history.push("/login")
                }}>
                    <i className="fe-log-out" style={{fontSize:24,color:"red",marginLeft:20}}/>
                    <div style={{color:"#000",fontSize:"1.05rem",fontWeight:700,marginLeft:25}}>Déconnexion</div>
                </div>
            </div>
        </Drawer>
    )

}
