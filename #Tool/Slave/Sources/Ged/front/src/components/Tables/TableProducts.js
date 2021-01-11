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
import {Button} from "@material-ui/core";



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

    const clients = props.products;


    return (
        <div>
            <h4 className="mt-0 mb-1">Products</h4>
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
                                        checked={true}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    </TableCell>
                                    <TableCell style={{width:"50%",fontWeight:600,minWidth:100}}> Produit </TableCell>
                                    <TableCell style={{width:"30%",fontWeight:600,minWidth:100}}> Prix unitaire </TableCell>
                                    <TableCell style={{width:"10%",fontWeight:600,minWidth:100}}> Action</TableCell>





                                </tr>
                                </thead>
                                <tbody>
                                {clients.map((item,key)=>(
                                    <tr key={key} style={{padding:10}}>
                                        <td className="text-center"   style={{width:"10%",minWidth:100}}>
                                            <Checkbox
                                                checked={true}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />                                        </td>
                                        <td style={{ width: "50%",minWidth:100 }} >
                                           <div className="row">
                                               <div className="col-md-2">
                                                   <img src={item.image}style={{width:"100%"}}/>
                                               </div>
                                               <div className="col-md-auto">
                                               <h4>
                                                   {item.nomProd}
                                               </h4>
                                               <small>
                                                   {item.descriptionProd}
                                               </small>
                                               </div>
                                           </div>
                                        </td>
                                        <td style={{ width: "30%" }} >
                                            <h4> {item.prix+"€"} </h4>
                                        </td>


                                        <td style={{ width: "10%"}}>

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

                                        </td>

                                    </tr>
                                ))}

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
