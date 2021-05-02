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
import WooService from "../../provider/wooService";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import rethink from "../../controller/rethink";

const db_name = "4e92789a-aa10-11eb-bcbc-0242ac130002"

export default function Profil(props){

    const [loading, setLoading] = React.useState(false);
    const [openInfoContent, setOpenInfoContent] = React.useState(false);
    const [orders, setOrders] = React.useState([]);
    const [openPayModal, setOpenPayModal] = React.useState(false);

    useEffect(() => {
        getOrders()
    }, []);

    const getOrders = () => {

        rethink.getTableData(db_name,"test","woo_users").then( res => {
            let users = res || []
            let find_current = users.find(x => x.email === localStorage.getItem("email"))
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
            <div style={{marginTop:70,padding:30,minHeight:"100vh"}}>
                <div align="center" className="mb-2">
                    <h5 style={{fontWeight:700,marginTop:20}}>Hello {localStorage.getItem("fname") !== null ? localStorage.getItem("fname") : ""}</h5>

                    <div style={{marginTop:35}}>
                        <List component="nav" style={{border:"1px solid #f0f0f0",borderRadius:7.5}}
                        >
                            <ListItem button style={{height:60}} divider={true} onClick={() => {setOpenInfoContent(!openInfoContent)}}>
                                <ListItemIcon>
                                    <PersonIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Infos personnelles" />
                                <ChevronRightIcon />
                            </ListItem>
                            <Collapse in={openInfoContent} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button style={{paddingLeft:40}}>
                                        <ListItemIcon>
                                            <EmailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={localStorage.getItem("email") || ""} />
                                    </ListItem>
                                    <ListItem button style={{paddingLeft:40}}>
                                        <ListItemIcon>
                                            <PhoneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={localStorage.getItem("phone") || ""} />
                                    </ListItem>
                                </List>
                            </Collapse>

                            <ListItem button style={{height:60}} onClick={() => {setOpenPayModal(true)}}>
                                <ListItemIcon>
                                    <AccountBalanceWalletIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Dernières commandes" />
                                <ChevronRightIcon />
                            </ListItem>
                            <Divider />
                            <ListItem button style={{height:60}}>
                                <ListItemIcon>
                                    <LocationOnIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Mes adresses" />
                                <ChevronRightIcon />
                            </ListItem>
                            <Divider />
                            <ListItem button style={{height:60}}>
                                <ListItemIcon>
                                    <ExitToAppIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Déconnexion" />
                                <ChevronRightIcon />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>



            <Dialog fullScreen={true} onClose={() => {
                setOpenPayModal(false)
            }}
                    aria-labelledby="simple-dialog-title" open={openPayModal}
            >
                <AppBar color="default">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => {
                            setOpenPayModal(false)
                        }} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div>
                    <div align="center" className="mb-2">
                        <h5 style={{fontWeight: 700, marginTop: 90}}>Mes commandes</h5>
                    </div>

                    <div style={{marginTop: 20, padding: 25}}>
                        {
                            orders.map((order,key) => (
                                <div style={{backgroundColor:"#f0f0f0",borderRadius:7.5,width:"100%",padding:10,marginBottom:15}}>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <h6>Commande #{order.woo_id}</h6>
                                        <p style={{fontSize:"0.75rem",fontWeight:"bold",color:"#f50057"}}>Total: {(order.total + 7.5) + " €"}</p>
                                    </div>
                                    <p style={{fontSize:"0.6rem",marginTop:-10}}>Placé le {moment(order.date_created).format("DD-MM-YYYY HH:mm")}</p>
                                    <h6>Articles:</h6>
                                    {
                                        order.line_items.map((produit,key) => (
                                            <div key={key}>
                                                <h6 style={{fontSize:"0.6rem"}}>{produit.quantity + " x " + produit.name}</h6>
                                            </div>
                                        ))
                                    }
                                    <div style={{display:"flex",marginTop:13}}>
                                        <h6>Facture:</h6>
                                        <p style={{fontSize:"0.6rem",marginLeft:5,textDecoration:"underline",color:"blue",cursor:"pointer"}}
                                           onClick={() => downloadB64File(order.odoo_fact_b64,"facture_" + moment(order.date_created).format("DD-MM-YYYY HH:mm") + ".pdf")}
                                        >
                                            {"facture_" + moment(order.date_created).format("DD-MM-YYYY HH:mm") + ".pdf" || ""}</p>
                                    </div>
                                    <div style={{display:"flex",marginTop:9}}>
                                        <h6>Paiement:</h6>
                                        <p style={{fontSize:"0.6rem",marginLeft:5}}>{order.payment_method_title || ""}</p>
                                    </div>
                                    <div align="right" style={{marginTop:-10}}>
                                        <span className="badge-warning text-white p-1" style={{fontWeight:700,fontSize:"0.7rem",borderRadius:10}}>en cours de livraison</span>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>


            </Dialog>

        </div>
    )

}
