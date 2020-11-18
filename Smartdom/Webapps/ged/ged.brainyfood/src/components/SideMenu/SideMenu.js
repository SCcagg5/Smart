import Drawer from "@material-ui/core/Drawer";
import React from "react";
import "./style.css"

const logo = localStorage.getItem("logo")

export default function SideMenu(props) {

    return(
        <Drawer anchor="left" open={props.opened} onClose={props.onClose} style={{backgroundColor:"#f5f5f5"}}>
            <div  style={{padding:15,width:300,marginLeft:15}}>
                <img alt="" src={props.logo} style={{height:150,width:250,objectFit:"contain"}}/>
            </div>

            <div style={{marginTop:30}}>
                {/*{
                    props.items.map((item,key) =>
                        <div key={key} className="menu-item" onClick={()=> props.history.push(item.to)} >
                            <i className={item.icon} style={{fontSize:24,color:props.iconColor,marginLeft:20}}/>
                            <div style={{color:props.textColor,fontSize:"1.05rem",fontWeight:700,marginLeft:25}}>{item.title}</div>
                        </div>
                    )
                }*/}
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
                    localStorage.clear();
                    props.history.push("/login")
                }}>
                    <i className="fe-log-out" style={{fontSize:24,color:"red",marginLeft:20}}/>
                    <div style={{color:"#000",fontSize:"1.05rem",fontWeight:700,marginLeft:25}}>Déconnexion</div>
                </div>
            </div>
        </Drawer>
    )

}
