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
import defaultAvatar from "../../assets/images/users/default_avatar.jpg";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import TableHead from '@material-ui/core/TableHead';

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

    return (
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" style={{width:"25%",fontWeight:600}}>Nom & Prénom</TableCell>
                     <TableCell align="center" style={{width:"30%",fontWeight:600}}>Email</TableCell>
                    <TableCell align="center" style={{width:"25%",fontWeight:600}}>Taux horaire</TableCell>
                    <TableCell align="center" style={{width:"20%",fontWeight:600}}>Action</TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? props.contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : props.contacts).map((row,key) => (
                        <TableRow key={key}>
                            <TableCell component="th" scope="row" style={{width:"25%"}}>
                                <div
                                    className="media align-items-center">
                                    <img className=" rounded-circle text-center"
                                        style={{
                                            width: 50,
                                            height: 50,
                                            objectFit: "contain"
                                        }}
                                        src={row.imageUrl || defaultAvatar}
                                        alt=""/>

                                    <div className="ml-1"
                                         style={{
                                             color: "#000",
                                             fontFamily: "sans-serif",
                                             fontWeight: 600,
                                             fontSize: 12
                                         }}>{row.nom} {row.prenom}
                                    </div>
                                </div>
                            </TableCell>
                             <TableCell style={{ width: "30%" }} align="center">
                                  {row.email}
                             </TableCell>
                            <TableCell style={{ width: "25%" }} align="center">
                                { row.rateFacturation ? row.rateFacturation + " CHF/h" : "" }
                            </TableCell>
                            <TableCell style={{ width: "20%" }} align="center">
                                <IconButton aria-label="Modifier" title="Modifier" color="default" size="small" onClick={() => props.onEditClick(row,key)}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                                <IconButton aria-label="Supprimer" title="Supprimer" color="secondary" size="small">
                                    <DeleteOutlineIcon fontSize="small"/>
                                </IconButton>
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