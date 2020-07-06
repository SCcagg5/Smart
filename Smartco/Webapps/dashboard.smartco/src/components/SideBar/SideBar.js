import Drawer from "@material-ui/core/Drawer";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import "./style.css"


export default function SideBar(props) {

    const useStyles = makeStyles((theme) => ({
        drawer: {
            width: props.width,
            flexShrink: 0,
        },
        drawerPaper: {
            width: props.width,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));

    const classes = useStyles();
    return(
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div align="center">
                {
                    (props.items || []).map((item,key) =>
                        <div onClick={()=> props.history.push(item.to)} className={props.selectedItem === item.key ? "item activeItem" :"item disabledItem"}>
                            <i className={item.icon} style={{color:props.selectedItem === item.key ? props.activeColor : props.disabledColor}}/>
                            <span style={{color:props.selectedItem === item.key ? props.activeColor : props.disabledColor}}>{item.title}</span>
                        </div>
                    )
                }
                <div align="center" className="logoutItem" onClick={()=> {
                    localStorage.clear();
                    props.history.push("/login")
                }}>
                    <i className="fe-log-out" style={{fontSize:28,color:"red"}}/>
                    <div>Déconnexion</div>
                </div>



            </div>
        </Drawer>
    )
}