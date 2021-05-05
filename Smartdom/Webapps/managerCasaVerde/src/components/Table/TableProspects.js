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
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import DataTable,{ defaultThemes ,createTheme}  from 'react-data-table-component';
import Button from "@material-ui/core/Button";

const ent_name = process.env.REACT_APP_ENT_NAME;
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

let fileUpload = {};

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

export default function TableProspects(props) {

    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [contact_ToDeleted, setContact_ToDeleted] = React.useState("");

    let contacts = props.prospects;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, contacts - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const customStyles = {
        header: {
            style: {
                minHeight: '56px',


            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: "black",

            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: "black",
                    fontWeight:900

                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: "black",
                },
            },
        },
    };
    const MesClients = [
        {
            name:"Date d'enregistrement",
            selector: 'dateCreation',
            sortable: true,
        },
        {
            name: "Prénom",
            selector: 'prenom',
            sortable: true,

        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: "Téléphone",
            selector: 'telephone',
            sortable: true,
        },
        {
            name: "adresse",
            selector: 'ville',
            sortable: true,
        },
        {
            name: 'Statut',
            cell:row => <div data-tag="allowRowEvents">{row.statut==="accepted"?<div
                className=" bg-success text-center p-1 "
                >
                <h4 style={{color: "white"}}>Accepted</h4>
            </div>: <div><mark style={{background:"yellow"}}>En attente</mark></div>} </div>,
            sortable: true,
        },
        {
            name: 'Action',
            sortable: true,
            cell: row => <div data-tag="allowRowEvents"><div className="row justify-content-between" style={{ fontWeight: "bold" }}><Button onClick={()=>{(console.log(row))}}  variant="contained" color="primary" >
                Voir
            </Button>
                <Button onClick={()=>{(console.log(row))}}  variant="contained" color="secondary" >
                    supprimer
                </Button></div></div>,
        }
]

    return (
        <div>

            <div className="mt-2" style={{textAlign:"right"}}>
                <div className="text-sm-right">
                    <button
                        onClick={() => {
                            props.onAddBtnClick()
                        }}
                        className="btn btn-danger waves-effect waves-light mb-2">
                        <i className="mdi mdi-plus-circle mr-1" /> Ajouter
                    </button>
                    {/*<button style={{marginLeft:10}}
                            onClick={() => {
                                fileUpload.click();
                            }}
                            className="btn btn-success waves-effect waves-light mb-2">
                        <i className="mdi mdi-import" />Importer(.csv .xlsx)
                    </button>
                    <button style={{marginLeft:10}}
                            onClick={() => {
                                main_functions.exportContactCSVFile(contacts,"contacts.csv")
                            }}
                            className="btn btn-light waves-effect waves-light mb-2">
                        <i className="mdi mdi-export" />Exporter
                    </button>*/}
                    <input
                        style={{ visibility: 'hidden', width: 0, height: 0 }}
                        onChange={(event) => {
                            props.onImportClick(event)
                        }}
                        type="file"
                        multiple={false}
                        ref={(ref) => (fileUpload = ref)}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-xl-12">

                    <div className="card">
                        <div className="card-body" style={{marginTop:35}}>
                            <DataTable
                                selectableRows
                                columns={MesClients}
                                data={contacts}

                                subHeader
                                customStyles={customStyles}
                                pagination
                                theme='solarized'




                            />
                        </div>
                    </div>
                </div>
            </div>


            <ModalTransition>
                {openDeleteModal === true && (
                    <Modal
                        actions={[
                            { text: 'Supprimer', onClick: () => {

                                props.deleteContact(contact_ToDeleted);
                                setContact_ToDeleted("")
                                    setOpenDeleteModal(false)

                                } },
                            { text: 'Annuler', onClick: () => {
                                    setContact_ToDeleted("")
                                    setOpenDeleteModal(false)
                                }},
                        ]}
                        onClose={() => {
                            setContact_ToDeleted("")
                            setOpenDeleteModal(false)
                        }}
                        heading="Vous êtes sur le point de supprimer ce contact !"
                        appearance="danger"
                    >

                    </Modal>
                )}
            </ModalTransition>

        </div>

    );
}
