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
import SelectSearch from 'react-select-search';
import userAvatar from '../../assets/images/users/user4.jpg';
import entIcon from '../../assets/images/entreprise-icon.png';
import moment from 'moment';
import main_functions from '../../controller/main_functions';
import utilFunctions from "../../tools/functions";



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



export default function TableTimeSheetsNonFact(props) {


    const classes = useStyles2();
    const [lf_client_search, setLf_client_search] = React.useState("");
    const [lf_client_search_ID, setLf_client_search_ID] = React.useState("");
    const [lf_dossier_search, setLf_dossier_search] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);


    const factures = (props.factures || [])
    const timeSheets = props.lignesFactures || [];
    let timeSheetsNonFact = [];

    let factures_ts = []
    factures.map((fact,key2) => {
        (fact.lignes_facture || []).map((lf,k) => {
            (fact.statut === "accepted" || fact.statut === "paid") && lf.id && factures_ts.push(lf.id)
        })
    })
    timeSheetsNonFact = timeSheets.filter(x => !factures_ts.includes(x.id))
    const searchFilter = (timeSheetsNonFact || []).filter((lf) => ( ( (lf.newTime.client_id.trim() === lf_client_search.trim() ) || lf_client_search === "") &&
        ( lf.newTime.dossier_client && lf.newTime.dossier_client.folder_id && (lf.newTime.dossier_client.folder_id === lf_dossier_search ) || lf_dossier_search === "") && (!lf.archived || (lf.archived && lf.archived === 0))
    ))

    searchFilter.sort( (a,b) => {
        var c = new Date(a.newTime.date);
        var d = new Date(b.newTime.date);
        return d-c;
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, searchFilter.length - page * rowsPerPage);

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
                <img alt="" src={Oa_user.imageUrl || userAvatar} style={{width:40,height:40,objectFit:"contain"}}/>
                <div style={{marginTop:12,marginLeft:3}}>{Oa_user.nom+" "+Oa_user.prenom}</div>
            </div>
        )
    }

    function renderSearchOption(props, option, snapshot, className) {
        const imgStyle = {
            borderRadius: '50%',
            verticalAlign: 'middle',
            marginRight: 10,
            width: 32, height: 32, objectFit: "cover"
        };

        return (
            <button {...props} className={className} type="button">
                <span>
                    <img alt="" style={imgStyle}
                         src={option.ContactType === "Person" ? option.imageUrl ? option.imageUrl : userAvatar : entIcon}/>
                    <span style={{fontSize: 13,marginTop:12,marginLeft:5}}>{option.ContactName}</span>
                </span>
            </button>
        );
    }

    const renderClientCases = (client_id) => {
        let cases = [];
        let clientsTempo = props.clientsTempo || [];
        clientsTempo.map((tmp,key) => {
            (tmp.folders || []).map((f,i) => {
                if(tmp.ID_client === client_id){
                    cases.push({
                        value:f.folder_id,
                        label:f.name
                    })
                }
            })
        })

        return(
            cases.map((item,key) => (
                <option key={key} value={item.value}>{item.label}</option>
            ))
        )
    }

    const renderTotalHours_CHF = () => {
        let totalCHF = 0;
        let totalHours = 0;
        searchFilter.map((item,key) => {
            let value = parseFloat(item.newTime.rateFacturation) * parseFloat(item.newTime.duree);
            totalCHF = totalCHF + value;
            totalHours = totalHours + parseFloat(item.newTime.duree);
        })

        return(
            [
                <TableCell align="center" style={{width:"10%",fontWeight:600,backgroundColor:"#f0f0f0"}}>{utilFunctions.formatDuration(totalHours.toString())}</TableCell>,
                <TableCell align="center" style={{width:"10%",fontWeight:600,backgroundColor:"#f0f0f0"}}>{totalCHF.toFixed(2) + " CHF"}</TableCell>
            ]
        )
    }

    let clientsTempo = props.clientsTempo || [];
    let all_opened_mandats = [{value:"",label:""}];
    if(lf_client_search !== ""){
        clientsTempo.map((tmp,key) => {
            (tmp.folders || []).map((f,i) => {
                if(tmp.ID_client === lf_client_search_ID){
                    all_opened_mandats.push({
                        value:f.name,
                        label:f.name
                    })
                }
            })
        })
    }

    let searchFilter_pagination = rowsPerPage > 0 ? searchFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : searchFilter;

    return (

        <div>

            <div className="row" style={{border:"2px solid #f0f0f0",padding:15,paddingLeft:10,marginTop:30,paddingBottom:30}}>
                <div className="col-md-5 mt-2">
                    <div style={{display:"flex"}}>
                        <h5 style={{marginRight:10}}>Client</h5>
                        <SelectSearch
                            className="select-search"
                            options={
                                props.annuaire_clients_mandat.map(({ Nom, Prenom, Type, imageUrl, ID }) =>
                                    ({
                                        value: ID,
                                        name: Nom + ' ' + (Prenom || ''),
                                        ContactType: Type,
                                        ContactName: Nom + ' ' + (Prenom || ''),
                                        imageUrl: imageUrl
                                    }))
                            }
                            value={lf_client_search}
                            renderOption={main_functions.renderSearchOption}
                            search
                            placeholder="Sélectionner.."
                            onChange={e => {
                                setPage(0);
                                setLf_client_search(e)
                                setLf_client_search_ID(e)

                                let cases = [];
                                let clientsTempo = props.clientsTempo || [];
                                clientsTempo.map((tmp,key) => {
                                    (tmp.folders || []).map((f,i) => {
                                        if(tmp.ID_client === e){
                                            cases.push({
                                                value:f.folder_id,
                                                label:f.name
                                            })
                                        }
                                    })
                                })
                                setLf_dossier_search(cases.length > 0 ? cases[0].value : "")

                            }}
                        />
                    </div>
                </div>
                <div className="col-md-5 mt-2">
                    <div style={{display:"flex"}}>
                        <h5>Dossier client</h5>
                        <select className="form-control custom-select" style={{width:230,marginLeft:10}}
                                onChange={(event) => {
                                    setPage(0);
                                    setLf_dossier_search(event.target.value)
                                }}
                                value={lf_dossier_search}
                        >
                            {
                                renderClientCases(lf_client_search_ID)
                            }


                        </select>
                    </div>
                </div>
            </div>

            {
                lf_client_search !== ""  &&

                <Table className={classes.table} aria-label="custom pagination table" style={{marginTop:35}}>
                    <TableHead>
                        <TableRow style={{padding:10}}>
                            <TableCell align="center" style={{width:"8%",fontWeight:600}}>Date</TableCell>
                            <TableCell align="center" style={{width:"17%",fontWeight:600}}>Nom du dossier</TableCell>
                            <TableCell align="center" style={{width:"25%",fontWeight:600}}>Description</TableCell>
                            <TableCell  style={{width:"20%",fontWeight:600}}>Utilisateur OA</TableCell>
                            <TableCell align="center" style={{width:"10%",fontWeight:600}}>Taux horaire</TableCell>
                            <TableCell align="center" style={{width:"10%",fontWeight:600}}>Durée</TableCell>
                            <TableCell align="center" style={{width:"10%",fontWeight:600}}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(searchFilter_pagination || []).map((row,key) => (
                            <TableRow key={key} style={{padding:10}}>
                                <TableCell style={{ width: "8%" }} align="center">
                                    {moment(row.newTime.date).format("DD/MM/YYYY") || ""}
                                </TableCell>
                                <TableCell style={{ width: "17%" }} align="center">
                                    {
                                        row.newTime.dossier_client ? (row.newTime.dossier_client.name && row.newTime.dossier_client.name !== "") ? (row.newTime.client || "") + " - " + row.newTime.dossier_client.name :
                                            (row.newTime.client || "" ) : (row.newTime.client || "")
                                    }
                                </TableCell>
                                <TableCell style={{ width: "30%" }} align="center">
                                    {row.newTime.description}
                                </TableCell>
                                <TableCell style={{ width: "20%" }} align="center">
                                    {renderOA_user(row.newTime.utilisateurOA)}
                                </TableCell>
                                <TableCell style={{ width: "10%" }} align="center">
                                    {row.newTime.rateFacturation +" CHF/h"}
                                </TableCell>
                                <TableCell style={{ width: "10%" }} align="center">
                                    <div>{utilFunctions.formatDuration(row.newTime.duree.toString())}</div>
                                </TableCell>
                                <TableCell style={{ width: "10%" }} align="center">
                                    <div>{(row.newTime.duree * parseInt(row.newTime.rateFacturation)).toFixed(2)}&nbsp;CHF</div>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow style={{padding:7}}>
                            <TableCell align="center" style={{width:"8%",fontWeight:600}}/>
                            <TableCell align="center" style={{width:"17%",fontWeight:600}}/>
                            <TableCell align="center" style={{width:"25%",fontWeight:600}}/>
                            <TableCell  style={{width:"20%",fontWeight:600}}/>
                            <TableCell align="center" style={{width:"10%",fontWeight:600}}/>
                            {renderTotalHours_CHF()}
                        </TableRow>

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 20 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20, { label: 'Tous', value: -1 }]}
                                //colSpan={3}
                                count={searchFilter.length}
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
            }


        </div>

    );
}
