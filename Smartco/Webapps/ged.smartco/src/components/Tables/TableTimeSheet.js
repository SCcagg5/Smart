import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import {Checkbox, Select as MuiSelect} from "@material-ui/core";
import time from"../../assets/icons/time.svg"
import play from"../../assets/icons/play.svg"
import down from"../../assets/icons/down.svg"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BT from "@material-ui/core/Button";
import money from "../../assets/icons/money.svg";
import DatePicker from "react-date-picker";
import calendar from "../../assets/icons/calendar.svg";
import {keys} from "@material-ui/core/styles/createBreakpoints";
import AtlButton from "@atlaskit/button";

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

export default function TableTimeSheet(props) {


    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [lignes_facture, setLignes_facture] = React.useState(props.lignesFactures);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, lignes_facture.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderOA_user = (email) => {
        let Oa_user = ""
        props.OA_contacts.map((contact,key) => {
            if(contact && contact.email && contact.email === email){
                Oa_user = contact
            }
        })
        return(
            <div style={{display:"flex"}}>
                <img alt="" src={Oa_user.imageUrl || ""} style={{width:35,height:35,objectFit:"cover"}}/>
                <div style={{marginTop:7}}>{Oa_user.nom+" "+Oa_user.prenom}</div>
            </div>
        )
    }


    let isOneSelected = false;
    lignes_facture.map((item,key) => {
        if(item.checked && item.checked === true) isOneSelected = true
    })



    return (

        <div>
            <div className="row align-items-center mt-1">
                <ButtonGroup aria-label="outlined secondary button group">
                    <BT>ALL</BT>
                    <BT><img alt="" src={time} style={{width: 20}}/>Time</BT>
                    <BT><img alt="" src={money} style={{width: 20}}/>Expense</BT>
                </ButtonGroup>

                <div className="ml-2">

                    <DatePicker
                        calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                        onChange={(e) => {
                        }}
                        value={new Date()}
                    />
                </div>
                <div className="ml-1">
                    <h5>-</h5>
                </div>
                <div className="ml-1">
                    <DatePicker
                        calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                        onChange={(e) => {
                        }}
                        value={new Date()}
                    />
                </div>

                <div className="ml-2">
                    <ButtonGroup aria-label="outlined secondary button group">
                        <BT>
                            <img alt="" src={play} style={{
                                width: 18,
                                transform: 'rotate(180deg)'
                            }}/>
                        </BT>
                        <BT>
                            <img alt="" src={play}
                                 style={{width: 18}}/>
                        </BT>
                    </ButtonGroup>
                </div>

                <div className="col-md-2 ml-2">
                    {/*<MuiSelect
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{width: "100%"}}
                        defaultValue={"Custom"}
                    >
                        <MenuItem value={"Custom"}>Custom</MenuItem>
                        <MenuItem value={"Associé"}>Custom 2</MenuItem>
                        <MenuItem value={"Collaborateur"}>Custom 3</MenuItem>
                    </MuiSelect>*/}
                </div>
            </div>

            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" style={{width:"5%"}}> <Checkbox checked={false}/>  </TableCell>
                        <TableCell align="center" style={{width:"5%",fontWeight:600}}>Actions</TableCell>
                        <TableCell align="center" style={{width:"10%",fontWeight:600}}>Type</TableCell>
                        <TableCell align="center" style={{width:"10%",fontWeight:600}}>Temps</TableCell>
                        <TableCell align="center" style={{width:"40%",fontWeight:600}}>Description</TableCell>
                        <TableCell align="center" style={{width:"20%",fontWeight:600}}>Utilisateur OA</TableCell>
                        <TableCell align="center" style={{width:"10%",fontWeight:600}}>Taux horaire</TableCell>



                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? lignes_facture.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : lignes_facture).map((row,key) => (
                        <TableRow key={key}>
                            <TableCell align="left"   style={{width:"5%"}}>
                                <div className="media align-items-center">
                                        <Checkbox  checked={lignes_facture[key].checked || false} onChange={(event) => {
                                            let ch_rows = lignes_facture;
                                            ch_rows[key].checked = event.target.checked
                                            props.setLignesFactures(ch_rows)

                                        }}  />
                                </div>
                            </TableCell>
                            <TableCell style={{ width: "5%" }} align="center">
                                <IconButton size="small" color="default">
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                <img alt="" src={time} style={{height:25,width:25,objectFit:"cover"}}/>
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                <div>{row.newTime.duree+"h"}</div>
                            </TableCell>
                            <TableCell style={{ width: "40%" }} align="center">
                                {row.newTime.description}
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                {renderOA_user(row.newTime.utilisateurOA)}
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                {row.newTime.rateFacturation +" CHF/h"}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            //colSpan={3}
                            count={lignes_facture.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            labelRowsPerPage="Lignes par page"
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            {
                isOneSelected === true &&
                <div className="mt-3" style={{textAlign:"right"}}>
                    <AtlButton
                        appearance="primary"
                        onClick={() => {
                            props.onClickFacture()
                            //this.createFacture()
                        }}>
                        ETABLIR FACTURE</AtlButton>
                </div>
            }

        </div>

    );
}
