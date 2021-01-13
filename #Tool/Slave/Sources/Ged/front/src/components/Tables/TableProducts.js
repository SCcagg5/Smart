import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import deleteIcon from '../../assets/icons/delete.svg'
import roomIcon from "../../assets/icons/room_icon.jpg"
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Collapse } from 'antd';
import mailSend from "../../assets/icons/mail-send.svg"
import loope from "../../assets/icons/loupe.svg"
import addIcon from "../../assets/icons/add_icon.png"
import {Button, MenuItem} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

import default_image from "../../assets/images/default_image_01.png"


const { Panel } = Collapse;
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function TableProducts(props) {

    const [updateX, setUpdateX] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [packName, setPackName] = React.useState("");

    const openNewPackPopover = Boolean(anchorEl);
    const id = openNewPackPopover ? 'new-pack-popover' : undefined;


    const products = props.products;

    let selected_products = [];
    let total = 0;
    products.map((item,key) => {
        if(item.checked && item.checked === true){
            selected_products.push(item)
            total = total + parseFloat(item.prix);
        }
    })


    return (
        <div>
            <h4 className="mt-0 mb-1">Produits</h4>
            <div className="row mt-3">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col">
                            <div className="page-title-box">
                                <div className="row ">
                                    <div
                                        className="col-md-2 bg-danger text-center "
                                        style={{width: "10%"}}>
                                        <h4 style={{color: "white",marginTop:5}}>Produits</h4>
                                    </div>
                                    <hr style={{
                                        backgroundColor: "#a6a6a6",
                                        height: "2px",
                                        borderStyle: "solid",
                                        color: "red",
                                        width: "60%"
                                    }}/>
                                    <div className="col-md-2">
                                        <Button onClick={()=>{props.ajouterProduit()}} variant="contained" color="primary">
                                            Ajouter un produit
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                <tr style={{padding:10}}>

                                    <TableCell className="text-center" style={{width:"10%",fontWeight:600,minWidth:100}}>
                                        <Checkbox
                                        checked={false}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    </TableCell>
                                    <TableCell style={{width:"50%",fontWeight:600,minWidth:100}}> Produit </TableCell>
                                    <TableCell style={{width:"30%",fontWeight:600,minWidth:100}}> Prix unitaire </TableCell>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((item,key)=>(
                                    <tr key={key} style={{padding:10}}>
                                        <td className="text-center"   style={{width:"10%",minWidth:100}}>
                                            <Checkbox
                                                checked={item.checked ||false}
                                                onChange={() => {
                                                    item.checked = item.checked ? !item.checked : true
                                                    setUpdateX(!updateX)
                                                }}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </td>
                                        <td style={{ width: "50%",minWidth:100 }} >
                                           <div className="row">
                                               <div className="col-md-2">
                                                   <img alt="" src={item.image ||default_image } style={{width:"100%"}}/>
                                               </div>
                                               <div className="col-md-auto">
                                               <h5>
                                                   {item.nomProd}
                                               </h5>
                                               <p>
                                                   {item.descriptionProd}
                                               </p>
                                               </div>
                                           </div>
                                        </td>
                                        <td style={{ width: "30%" }} >
                                            <h5> {item.prix+"€"} </h5>
                                        </td>


                                        {/*<td style={{ width: "10%"}}>

                                            <div style={{display:"flex"}}>
                                                <div style={{margin:3}}>
                                                    <img src={addIcon}  onClick={()=>{
                                                        const r = window.confirm(
                                                            'Voulez-vous vraiment ajouter ce "Prospect" à la liste des clients mandat ?'
                                                        );
                                                        if (r === true) {
                                                            props.moveProspectToClients(item)
                                                        }else{
                                                        }
                                                    }}
                                                         style={{width:45,height:45,cursor:"pointer",marginTop:-8}}
                                                    >
                                                    </img>
                                                </div>
                                                <div style={{margin:3}}>
                                                    <img src={loope}  onClick={()=>{
                                                        props.onSelectProduct(item,key)

                                                       }}
                                                         style={{width:30,height:30,cursor:"pointer"}}
                                                    >
                                                    </img>
                                                </div>
                                                <div style={{margin:3}}>
                                                    <img src={roomIcon} style={{width:30,height:30,cursor:"pointer"}}
                                                         onClick={()=> {
                                                             const r = window.confirm(
                                                                 'Voulez-vous vraiment créer un espace Room avec ce client ?'
                                                             );
                                                             if (r === true) {
                                                                 props.createProspectRoom(item)
                                                             }else{
                                                             }
                                                         }}
                                                    />
                                                </div>

                                            </div>

                                        </td>*/}

                                    </tr>
                                ))}

                                </tbody>

                            </table>
                            {
                                selected_products.length > 0 &&
                                <div style={{marginTop:20}}>
                                    <h5 style={{color:"#f50057"}}>{selected_products.length + " produits sélectionnés"}</h5>
                                    <div align="right">
                                        <span style={{fontWeight:"bold",color:"#000"}}>Total:&nbsp;{total + " €"} </span><br/>
                                        <Button style={{marginTop:15}} onClick={(e)=>{
                                            setAnchorEl(e.currentTarget)
                                        }}
                                                variant="contained" color="primary" size="small">
                                            Nouveau Pack
                                        </Button>
                                    </div>
                                </div>
                            }


                            <Popover
                                id={id}
                                open={openNewPackPopover}
                                anchorEl={anchorEl}
                                onClose={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setAnchorEl(null)
                                }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <div style={{padding:15}}>
                                    <h5 style={{color:"#000",textDecoration:"underline"}}>Nouveau Pack</h5>
                                    <div style={{marginTop:20}}>
                                        <TextField  value={packName}
                                                    onChange={(e) => {setPackName(e.target.value)}}
                                                    id="outlined-basic" label="Nom" variant="outlined" />
                                    </div>
                                    <div style={{marginTop:20}}>
                                        <h6 style={{color:"#f50057"}}>{selected_products.length + " produits sélectionnés"}</h6>
                                    </div>
                                    <div align="right">
                                        <span style={{fontWeight:"bold",color:"#000"}}>Total:&nbsp;{total + " €"} </span><br/>
                                        <Button style={{marginTop:15}} onClick={()=>{
                                            let products = [];
                                            selected_products.map((item,key) => {
                                                products.push({
                                                    id_prod:item.id_prod,
                                                    image:item.image,
                                                    nomProd:item.nomProd,
                                                    descriptionProd:item.descriptionProd,
                                                    prix:item.prix
                                                })
                                            })
                                            let newpack = {
                                                name:packName,
                                                products:products,
                                                created_at:moment().format("YYYY-MM-DD HH:mm:ss"),
                                                created_by:localStorage.getItem("email")
                                            }
                                            props.addNewPack(newpack)
                                            setTimeout(() => {
                                                setAnchorEl(null)
                                                setPackName("");
                                                (products || [] ).map((item,key) => {
                                                    item.checked = false
                                                })
                                                selected_products = [];
                                                setUpdateX(!updateX)
                                            },500);
                                        }}
                                                variant="contained" color="primary" size="small">
                                            Ajouter
                                        </Button>
                                    </div>
                                </div>
                            </Popover>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
