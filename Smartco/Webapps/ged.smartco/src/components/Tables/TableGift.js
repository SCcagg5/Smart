import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Collapse } from 'antd';
import {Button} from "@material-ui/core";
import loope from "../../assets/icons/loupe.svg"


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

export default function TableGift(props) {

    const clients = props.patients;
    const [bouteilles,setBouteilles] = useState(3);



    return (
        <div>
            <h4 className="mt-0 mb-1">Clients </h4>
            <div className="row mt-3">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col">
                            <div className="page-title-box">
                                <div className="row ">
                                    <div
                                        className="col-md-2 bg-danger text-center "
                                        style={{width: "10%"}}>
                                        <h4 style={{color: "white",marginTop:5}}>OA Legal</h4>
                                    </div>
                                    <hr style={{
                                        backgroundColor: "#a6a6a6",
                                        height: "2px",
                                        borderStyle: "solid",
                                        color: "red",
                                        width: "80%"
                                    }}/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <Button onClick={()=>{props.openModal("","")}} variant="contained" color="primary">
                            Envoyer une bouteille
                        </Button>
                    </div>


                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                <tr style={{padding:10}}>

                                    <TableCell style={{width:"10%",fontWeight:600,minWidth:100}}>Nom</TableCell>
                                    <TableCell style={{width:"10%",fontWeight:600,minWidth:100}}>Prenom</TableCell>
                                    <TableCell  style={{width:"10%",fontWeight:600}}>Email</TableCell>
                                    <TableCell  style={{width:"10%",fontWeight:600}}>Société</TableCell>
                                    <TableCell  style={{width:"10%",fontWeight:600}}>nombre de bouteille offertes</TableCell>
                                    {/*<TableCell  style={{width:"10%",fontWeight:600}}>Mot de passe et bienvenue</TableCell>*/}
                                    <TableCell  style={{width:"10%",fontWeight:600,minWidth:150}}>Actions</TableCell>


                                </tr>
                                </thead>
                                <tbody>
                                {clients.map((item,key)=>(
                                    <tr key={key} style={{padding:10}}>
                                        <td   style={{width:"10%",minWidth:100}}>
                                            {item.Type==="0"? " ":item.Nom}
                                        </td>
                                        <td style={{ width: "10%",minWidth:100 }} >
                                            {item.Type==="0"? " ":item.Prenom}
                                        </td>
                                        <td style={{ width: "10%" }} >
                                            {item.email}
                                        </td>
                                        <td style={{ width: "10%" }} >

                                            {item.Type==="0"? item.Nom:""}
                                        </td>
                                        <td  className="text-center"style={{ width: "10%" }} >
                                            {item.nbGifts || 0}

                                        </td>

                                        <td style={{ width: "10%"}}>

                                            <div className="row justify-content-center">
                                                <div className="col-md-auto">
                                                    <img src={loope}  onClick={()=>{

                                                    }}
                                                             style={{width:30,height:30,cursor:"pointer"}} >

                                                    </img>
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
