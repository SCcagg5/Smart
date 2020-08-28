import React from 'react';
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
import {Checkbox} from "@material-ui/core";
import time from"../../assets/icons/time.svg"
import play from"../../assets/icons/play.svg"
import down from"../../assets/icons/down.svg"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

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

export default function TableContact(props) {

    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.contacts.length - page * rowsPerPage);

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

    return (
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                    <TableCell align="left" style={{width:"10%"}}> <Checkbox checked={false}/>  </TableCell>
                    <TableCell align="center" style={{width:"10%",fontWeight:600}}>Actions</TableCell>
                    <TableCell align="center" style={{width:"10%",fontWeight:600}}>Type</TableCell>
                    <TableCell align="center" style={{width:"10%",fontWeight:600}}>Qty</TableCell>
                    <TableCell align="center" style={{width:"30%",fontWeight:600}}>Description</TableCell>
                    <TableCell align="center" style={{width:"20%",fontWeight:600}}>Matter</TableCell>
                    <TableCell align="center" style={{width:"10%",fontWeight:600}}>Rate (CHF)</TableCell>



                </TableRow>
            </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? props.contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.contacts).map((row,key) => (
                        <TableRow key={key}>
                            <TableCell align="left"   style={{width:"10%"}}>
                                <div className="media align-items-center">


                                    <div>
                                        <Checkbox checked={false}/>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                    <Button
                                        variant="contained"
                                        endIcon={<img src={down} style={{width:"100%"}}/>}

                                        color="primary"  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        Edit


                                    </Button>
                                    </div>
                                    <div className="col-md-6">
                                    <Button
                                        variant="contained"
                                        startIcon={<img src={play} style={{width:"100%"}}/>}>
                                        {row.newTime.duree}
                                    </Button>
                                    </div>
                                    {/*<Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </Menu>*/}
                                </div>
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                <img src={time} style={{width:"50%"}}/>
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                <div>0.20h</div>
                            </TableCell>
                            <TableCell style={{ width: "30%" }} align="center">
                                {row.newTime.description}
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                0126-G..
                            </TableCell>
                            <TableCell style={{ width: "10%" }} align="center">
                                {row.newTime.rateFacturation}
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
                            colSpan={3}
                            count={props.contacts.length}
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
    );
}
