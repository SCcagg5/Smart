import React, {useEffect} from "react";
import MuiBackdrop from "../../Components/Loading/MuiBackdrop";
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import CajooService from "../../provider/cajooservice";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import rethink from "../../controller/rethink";
import { useParams } from "react-router-dom";
import arbre1 from "../../assets/icons/arbre1.jpeg"
import solar1 from "../../assets/icons/solar1.jpeg"
import ecoscore from "../../assets/icons/Eco-Score.png"
import QRCode from 'qrcode.react'
import Map from '../../Components/googleMap/Map'

const db_name = "b116081d-3145-4dc3-b3df-5ac2bde13e9d"

export default function TreeScore(props){

    const [loading, setLoading] = React.useState(true);
    const [openInfoContent, setOpenInfoContent] = React.useState(false);
    const [orders, setOrders] = React.useState([]);
    const [user, setUser] = React.useState();

    const [openPayModal, setOpenPayModal] = React.useState(false);
    let { id } = useParams();

    useEffect(() => {
        getOrders()
    }, []);

    const getOrders = () => {


        rethink.getTableData(db_name,"test","woo_users").then( res => {
            let users = res || []
            let find_current = users.find(x => x.id === id)
            setUser(find_current)
            console.log(find_current)
            setLoading(false)
            console.log(find_current)
            if(find_current){
                setOrders(find_current.orders|| [])
            }
        }).catch( err => {
            console.log(err)
        })

        /*CajooService.getOrders().then(ordersRes => {
            if(ordersRes){
                let all_orders = ordersRes.data || [];
                let user_orders = [];
                all_orders.map((order,key) => {
                    if(order.billing && order.billing.email !== null && order.billing.email === localStorage.getItem("email")){
                        user_orders.push(order)
                    }
                })
                console.log(user_orders)
                setOrders(user_orders)
            }
        }).catch(err => {console.log(err)})*/
    }

    const downloadB64File = (b64,name) => {
        let a = document.createElement('a');
        a.href = 'data:application/pdf;base64,' + b64;
        a.download = name;
        a.click();
    }

    return(
        <div>
            <MuiBackdrop open={loading}/>
            { loading===false&&<div style={{marginTop: 70, padding: 30, minHeight: "100vh"}}>
                <div align="center" className="mb-2">

                    <h2 style={{fontWeight:'bold'}}>Tree Score</h2>
                    <img src={arbre1} style={{width:150,marginTop:10}} />,


                    <div style={{marginTop: 35}}>
                        <Map lat={-23.732388} lng={30.238915}></Map>
                    </div>
                </div>
            </div>
            }






        </div>
    )

}