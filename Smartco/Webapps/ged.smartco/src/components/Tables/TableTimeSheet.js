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
import { Avatar, Checkbox, Input, Select as MuiSelect } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import DatePicker from 'react-date-picker';
import calendar from '../../assets/icons/calendar_icon.jpg';
import AtlButton, { ButtonGroup as AltButtonGroup } from '@atlaskit/button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Autosuggest from 'react-autosuggest';
import SelectSearch from 'react-select-search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Data from '../../data/Data';
import userAvatar from '../../assets/images/users/user4.jpg';
import entIcon from '../../assets/images/entreprise-icon.png';
import moment from 'moment';
import main_functions from '../../controller/main_functions';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import utilFunctions from "../../tools/functions";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Select from '@atlaskit/select';
import groupBy from 'lodash/groupBy'
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import AltAvatarGroup from "@atlaskit/avatar-group";

const getTimeSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : Data.timeSuggestions.filter(x =>
        x.toLowerCase().slice(0, inputLength) === inputValue
    );
};

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
    const [showUpdateModal, setShowUpdateModal] = React.useState(false);

    const [selectedRow, setSelectedRow] = React.useState("");
    const [toUpdated_date, setToUpdated_date] = React.useState(new Date());
    const [toUpdated_rate, setToUpdated_rate] = React.useState("");
    const [toUpdated_OAUser, setToUpdated_OAUser] = React.useState("");
    const [toUpdated_dossier_client, setToUpdated_dossier_client] = React.useState("");
    const [toUpdated_dossier_client_id, setToUpdated_dossier_client_id] = React.useState("");
    const [toUpdated_desc, setToUpdated_desc] = React.useState("");
    const [toUpdated_client_id, setToUpdated_client_id] = React.useState("");
    const [toUpdated_client, setToUpdated_client] = React.useState("");

    const [timeSuggestions, setTimeSuggestions] = React.useState([]);
    const [duration, setDuration] = React.useState("");

    //const [lf_client_search, setLf_client_search] = React.useState(props.annuaire_clients_mondat[0].Nom + ' ' + (props.annuaire_clients_mondat[0].Prenom || '') );
    const [lf_client_search, setLf_client_search] = React.useState("");
    const [lf_client_search_ID, setLf_client_search_ID] = React.useState("");
    const [lf_dossier_search, setLf_dossier_search] = React.useState("");
    const [lf_oaUser_search, setLf_oaUser_search] = React.useState(
        main_functions.getOAContactByEmail2(props.OA_contacts,localStorage.getItem("email")) !== '' ? localStorage.getItem("email") : ""
    );
    const [lf_assoc_dossier_search, setLf_assoc_dossier_search] = React.useState("");
    const [lf_sdate_search, setLf_sdate_search] = React.useState(null);
    const [lf_edate_search, setLf_edate_search] = React.useState(null);

    const [selectedClientFolders, setSelectedClientFolders] = React.useState([]);

    const [partner_facture, setPartner_facture] = React.useState("");
    const [facture_date, setFacture_date] = React.useState(new Date());
    const [check_all, setCheck_all] = React.useState(false);

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [lf_TooDeleted, setLf_TooDeleted] = React.useState("");

    const [selectedDate, setSelectedDate] = React.useState(moment());

    const [x_update, setX_update] = React.useState(false);



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [sort, setSort] = React.useState("asc");
    const [sort_in_folder_form, setSort_in_folder_form] = React.useState("asc");

    const [showBy, setShowBy] = React.useState({ label: 'Par TimeSheet', value: 'timesheet' });
    const [open, setOpen] = React.useState(false);
    const [exapndedRowKey, setExapndedRowKey] = React.useState("");



    const searchFilter = props.lignesFactures.filter((lf) => ( ( (lf.newTime.client_id.trim() === lf_client_search.trim() ) || lf_client_search === "") &&
        ( lf.newTime.dossier_client && lf.newTime.dossier_client.folder_id && (lf.newTime.dossier_client.folder_id === lf_dossier_search ) || lf_dossier_search === "") &&
        ( lf.newTime && lf.newTime.utilisateurOA && (lf.newTime.utilisateurOA === lf_oaUser_search ) || lf_oaUser_search === "") &&
        ( lf.newTime && lf.newTime.dossier_client.team && (lf.newTime.dossier_client.team.find(x => x.uid === lf_assoc_dossier_search && x.type === "lead")  ) || lf_assoc_dossier_search === "") &&
        ( (lf_sdate_search !== null && ( new Date(lf.newTime.date).getTime() >= lf_sdate_search.getTime())) || lf_sdate_search === null  ) &&
        ( (lf_edate_search !== null && (new Date(lf.newTime.date).getTime() <= (moment(lf_edate_search).set({hour:23,minute:59}).unix() * 1000) ))  || lf_edate_search === null  ) &&
        ( (selectedDate !== "" && (moment(selectedDate.format("YYYY-MM-DD")).isSame(moment(lf.newTime.date).format("YYYY-MM-DD")))) || selectedDate === "" )
    ))

    searchFilter.sort( (a,b) => {
        var c = new Date(a.newTime.date);
        var d = new Date(b.newTime.date);
        return sort === "asc" ?  d-c : c-d;
    });

    const factures = (props.factures || [])
    let factures_ts = []
    factures.map((fact) => {
        (fact.lignes_facture || []).map((lf) => {
            fact.statut === "accepted" && lf.id && factures_ts.push(lf.id)
        })
    })

    let filtredArray = searchFilter.filter(x => !factures_ts.includes(x.id) && x.newTime.dossier_client.folder_id !== undefined)

    const groupedArray = groupBy(filtredArray, function(n) {
        return n.newTime.dossier_client.folder_id
    });

    const groupedFormatedArray = Object.values(groupedArray);

    const selected = searchFilter.filter((lf) => ( lf.checked === true ));
    let total = 0;
    let nb_heures = 0;
    selected.map((item) => {
        let value = parseFloat(item.newTime.rateFacturation) * parseFloat(item.newTime.duree);
        total = total + value;
        nb_heures = nb_heures + parseFloat(item.newTime.duree);
    })

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, searchFilter.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const renderOA_user = (email) => {
        let Oa_user = ""
        props.OA_contacts.map((contact,key) => {
            if(contact && contact.email && contact.email === email){
                Oa_user = contact
            }
        })
        return(
            <div style={{display:"flex",justifyContent:"center"}}>
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

    const renderTotalHours_CHF_byFolder = (dossier) => {
        let totalCHF = 0;
        let totalHours = 0;
        dossier.map((item,key) => {
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

    const renderTotalHours_CHF_allFolders = (cases) => {
        let totalCHF = 0;
        let totalHours = 0;
        (cases || []).map((c) => {
            (c || []).map((item,key) => {
                let value = parseFloat(item.newTime.rateFacturation) * parseFloat(item.newTime.duree);
                totalCHF = totalCHF + value;
                totalHours = totalHours + parseFloat(item.newTime.duree);
            })
        })
        return(
            [
                <TableCell align="center" style={{width:"10%",fontWeight:600,backgroundColor:"#f0f0f0"}}>{utilFunctions.formatDuration(totalHours.toString())}</TableCell>,
                <TableCell align="center" style={{width:"10%",fontWeight:600,backgroundColor:"#f0f0f0"}}>{totalCHF.toFixed(2) + " CHF"}</TableCell>
            ]
        )
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

    function onInputTimeSuggChange(event, {newValue})  {
        setDuration(newValue)
    }

    function onTimeSuggestionsFetchRequested({value}){
        setTimeSuggestions(getTimeSuggestions(value))
    }

    function onTimeSuggestionsClearRequested(){
        setTimeSuggestions([])
    }

    const inputSuggProps = {
        placeholder: 'Format: --h--',
        value: duration,
        onChange: onInputTimeSuggChange
    };


    let searchFilter_pagination = rowsPerPage > 0 ? searchFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : searchFilter;

    return (

        <div style={{minWidth:1000}}>
            <div align="right">
                <div style={{width:180}}>
                    <Select
                        className="single-select"
                        classNamePrefix="react-select"
                        options={[
                            { label: 'Par TimeSheet', value: 'timesheet' },
                            { label: 'Par dossier', value: 'dossier' }
                        ]}
                        value={showBy}
                        defaultValue={{ label: 'Par TimeSheet', value: 'timesheet' }}
                        onChange={(value) => {
                            console.log(value)
                            setShowBy(value)
                        }}
                    />
                </div>
            </div>
            <div style={{marginTop:-25}} align="center">
                <AltButtonGroup>
                    <AtlButton appearance="default" isDisabled={selectedDate === ""}
                               iconBefore={<ChevronLeftIcon fontSize="small"/>}
                               onClick={() => {
                                   setPage(0);
                                   setSelectedDate(moment(selectedDate).subtract(1,'d'))
                               }}
                    >
                        Jour précédent
                    </AtlButton>
                    <AtlButton  isSelected={selectedDate !== "" && moment(moment().format("YYYY-MM-DD")).isSame(selectedDate.format("YYYY-MM-DD"))}
                                onClick={() => {
                                    setPage(0);
                                    setLf_sdate_search(null)
                                    setLf_edate_search(null)
                                    setSelectedDate(moment())
                                }}
                    >
                        Aujourd'hui
                    </AtlButton>
                    <AtlButton appearance="default"  isDisabled={ (selectedDate !== "" && moment(moment().format("YYYY-MM-DD")).isSame(selectedDate.format("YYYY-MM-DD"))) || selectedDate === "" }
                               iconAfter={<ChevronRightIcon fontSize="small"/>}
                               onClick={() => {
                                   setPage(0);
                                   setSelectedDate(moment(selectedDate).add(1,'d'))
                               }}
                    >
                        Jour suivant
                    </AtlButton>
                    <AtlButton appearance="default" isSelected={selectedDate === ""}
                               onClick={() => {
                                   setPage(0);
                                   setSelectedDate("")
                               }}
                    >
                        Personnalisé
                    </AtlButton>
                </AltButtonGroup>
            </div>
            {
                selectedDate !== "" &&
                <div align="center" className="mt-2">
                    <AtlButton appearance="warning">
                        Le {selectedDate.format("DD MMMM YYYY")}
                    </AtlButton>
                </div>
            }

            <div className="row" style={{border:"2px solid #f0f0f0",padding:15,paddingLeft:10,marginTop:20,paddingBottom:20}}>
                <div className="col-md-12">
                    <div align="right">
                        <AtlButton
                            onClick={() => {
                                setPage(0);
                                setLf_sdate_search(null)
                                setLf_edate_search(null)
                                setLf_client_search("")
                                setLf_oaUser_search("")
                                setLf_dossier_search("")
                                setLf_client_search_ID("")
                                setLf_assoc_dossier_search("")
                                setOpen(false)
                                setExapndedRowKey("")
                            }}
                        >Initialiser</AtlButton>
                    </div>
                </div>
                <div className="col-md-12" style={{marginTop:-15}}>
                    <h5>Rechercher</h5>
                </div>
                {
                    selectedDate === "" &&
                    <div className="col-md-12 mt-2">
                        <div style={{display: "flex"}}>
                            <h5>De</h5>
                            <div style={{marginLeft: 10, marginRight: 10}}>
                                <DatePicker
                                    calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                                    onChange={(e) => {
                                        setPage(0);
                                        setOpen(false)
                                        setExapndedRowKey("")
                                        setLf_sdate_search(e)
                                    }}
                                    value={lf_sdate_search}
                                    dayPlaceholder="dd"
                                    monthPlaceholder="mm"
                                    yearPlaceholder="yyyy"
                                />
                            </div>
                            <h5>à</h5>
                            <div style={{marginLeft: 10, marginRight: 10}}>
                                <DatePicker
                                    calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                                    onChange={(e) => {
                                        setPage(0);
                                        setOpen(false)
                                        setExapndedRowKey("")
                                        setLf_edate_search(e)
                                    }}
                                    value={lf_edate_search}
                                    dayPlaceholder="dd"
                                    monthPlaceholder="mm"
                                    yearPlaceholder="yyyy"
                                />
                            </div>
                        </div>
                    </div>
                }
                <div className="col-md-5 mt-2">
                    <div style={{display:"flex"}}>
                        <h5 style={{marginRight:10}}>Par client</h5>
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
                                setOpen(false)
                                setExapndedRowKey("")
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

                                let ch_rows = props.lignesFactures;
                                ch_rows.map((item,key) => {
                                    item.checked = false
                                })
                                props.setLignesFactures(ch_rows)
                                setCheck_all(false)
                            }}
                        />
                    </div>
                </div>
                <div className="col-md-5 mt-2">
                    <div style={{display:"flex"}}>
                        <h5>Par dossier</h5>
                        <select className="form-control custom-select" style={{width:230,marginLeft:10}}
                                onChange={(event) => {
                                    setPage(0);
                                    setOpen(false)
                                    setExapndedRowKey("")
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
                <div className="col-md-5 mt-2">
                    <div style={{display:"flex"}}>
                        <h5 >Par utilisateur OA</h5>
                        <MuiSelect
                            labelId="demo-mutiple-chip-label14545"
                            id="demo-mutiple-chip34688"
                            style={{ width: 250,marginLeft:10,marginRight:10 }}
                            value={lf_oaUser_search}
                            onChange={(e) => {
                                setPage(0);
                                setOpen(false)
                                setExapndedRowKey("")
                                setLf_oaUser_search(e.target.value)
                            }}
                            MenuProps={Data.MenuProps}
                        >
                            <MenuItem
                                key={-1}
                                value={""}>
                                <div className="row align-items-center justify-content-center">
                                    <div style={{marginLeft:10}}>{"Aucun"}</div>
                                </div>
                            </MenuItem>
                            {props.OA_contacts.map((contact, key) => (
                                <MenuItem
                                    key={key}
                                    value={contact.email}>
                                    <div
                                        className="row align-items-center justify-content-center">
                                        <Avatar
                                            alt=""
                                            src={contact.imageUrl} />
                                        <div>{contact.nom + ' ' + contact.prenom}</div>
                                    </div>
                                </MenuItem>
                            ))}
                        </MuiSelect>
                    </div>
                </div>
                <div className="col-md-5 mt-2">
                    <div style={{display:"flex"}}>
                        <h5 >Par associé en charge de dossier</h5>
                        <MuiSelect
                            labelId="demo-mutiple-chip-label14545"
                            id="demo-mutiple-chip34688"
                            style={{ width: 250,marginLeft:10,marginRight:10 }}
                            value={lf_assoc_dossier_search}
                            onChange={(e) => {
                                setPage(0);
                                setOpen(false)
                                setExapndedRowKey("")
                                setLf_assoc_dossier_search(e.target.value)
                            }}
                            MenuProps={Data.MenuProps}
                        >
                            <MenuItem
                                key={-1}
                                value={""}>
                                <div className="row align-items-center justify-content-center">
                                    <div style={{marginLeft:10}}>{"Aucun"}</div>
                                </div>
                            </MenuItem>
                            {props.OA_contacts.filter(x => x.type && x.type === "associe").map((contact, key) => (
                                <MenuItem
                                    key={key}
                                    value={contact.uid}>
                                    <div
                                        className="row align-items-center justify-content-center">
                                        <Avatar
                                            alt=""
                                            src={contact.imageUrl} />
                                        <div>{contact.nom + ' ' + contact.prenom}</div>
                                    </div>
                                </MenuItem>
                            ))}
                        </MuiSelect>
                    </div>
                </div>
            </div>
            {
                selected.length > 0 &&
                <h5 style={{marginTop:20,color:"blue"}}>
                    {selected.length === 1 ? "Une ligne facture sélectionnée" : selected.length + " lignes factures sélectionnées"}
                </h5>
            }
            {
                showBy.value === "timesheet" ?
                    <Table className={classes.table} aria-label="custom pagination table" style={{marginTop:20}}>
                        <TableHead>
                            <TableRow style={{padding:10}}>
                                {
                                    lf_client_search_ID !== "" &&
                                    <TableCell align="left" style={{width:"5%"}}>
                                        <Checkbox checked={check_all}
                                                  onChange={(event) => {
                                                      setCheck_all(event.target.checked)
                                                      searchFilter.map((item,key) => {
                                                          searchFilter[key].checked = event.target.checked
                                                      })
                                                  }}
                                        />
                                    </TableCell>
                                }

                                <TableCell align="center" style={{width:"6%",fontWeight:600}}>Actions</TableCell>
                                <TableCell align="center" style={{width:"9%",fontWeight:600}}>
                                    <div style={{display:"flex"}}>
                                        <IconButton size="small" onClick={() => {
                                            sort === "asc" ? setSort("desc") : setSort("asc")
                                        }}
                                        >
                                            {
                                                sort === "asc" ? <ArrowDropDownIcon fontSize="small"/> : <ArrowDropUpIcon fontSize="small"/>
                                            }

                                        </IconButton>
                                        <div>Date</div>
                                    </div>

                                </TableCell>
                                <TableCell align="center" style={{width:"20%",fontWeight:600}}>Nom du dossier</TableCell>
                                <TableCell align="center" style={{width:"28%",fontWeight:600}}>Description</TableCell>
                                <TableCell align="center" style={{width:"15%",fontWeight:600}}>Utilisateur OA</TableCell>
                                <TableCell align="center" style={{width:"13%",fontWeight:600}}>Taux horaire</TableCell>
                                <TableCell align="center" style={{width:"10%",fontWeight:600}}>Durée</TableCell>
                                <TableCell align="center" style={{width:"10%",fontWeight:600}}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(searchFilter_pagination || []).map((row,key) => (
                                <TableRow key={key} style={{padding:10}}>
                                    {
                                        lf_client_search_ID !== "" &&
                                        <TableCell align="left"   style={{width:"5%",backgroundColor:searchFilter_pagination[key].checked && searchFilter_pagination[key].checked === true ? "rgba(220, 0, 78, 0.08)" : "transparent"}}>
                                            <div className="media align-items-center">
                                                <Checkbox  checked={(searchFilter_pagination[key].checked === true || searchFilter_pagination[key].checked === false)  ? searchFilter_pagination[key].checked : false}
                                                           onChange={(event) => {
                                                               setX_update(!x_update)
                                                               searchFilter_pagination[key].checked = event.target.checked
                                                               if(searchFilter_pagination[key].checked === false) setCheck_all(false)
                                                           }}  />
                                            </div>
                                        </TableCell>
                                    }

                                    <TableCell style={{ width: "6%"}} align="center">
                                        <IconButton size="small" color="default" onClick={() => {
                                            console.log(row)
                                            if(row.user_email === localStorage.getItem("email") || row.newTime.utilisateurOA === localStorage.getItem("email")){
                                                setSelectedRow(row)
                                                const row_copy = row;
                                                setDuration(utilFunctions.formatDuration(row_copy.newTime.duree.toString()))
                                                setToUpdated_date(new Date(row_copy.newTime.date))
                                                setToUpdated_rate(row_copy.newTime.rateFacturation)
                                                setToUpdated_OAUser(row_copy.newTime.utilisateurOA)
                                                setToUpdated_desc(row_copy.newTime.description)
                                                setToUpdated_client_id(row_copy.newTime.client_id)

                                                let findClientFname = props.annuaire_clients_mandat.find(x => x.ID === row_copy.newTime.client_id)
                                                setToUpdated_client(findClientFname.Nom + ' ' + (findClientFname.Prenom || ''))
                                                setToUpdated_dossier_client(row_copy.newTime.dossier_client)


                                                let findClientTempo = props.clientsTempo.find(x => x.ID_client === row_copy.newTime.client_id);
                                                if(findClientTempo){
                                                    console.log(findClientTempo.folders || [])
                                                    setSelectedClientFolders(findClientTempo.folders || [])
                                                    setTimeout(() => {
                                                        setToUpdated_dossier_client_id(row_copy.newTime.dossier_client.folder_id && row_copy.newTime.dossier_client.folder_id !== "" ? row_copy.newTime.dossier_client.folder_id : "" );
                                                    },200)
                                                }
                                                setShowUpdateModal(true)
                                                setX_update(!x_update)

                                            }else{
                                                alert("Vous n'êtes pas le proprietaire de ce timeSheet !")
                                            }
                                        }}>
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton size="small"
                                                    onClick={() => {
                                                        if(row.user_email === localStorage.getItem("email") || row.newTime.utilisateurOA === localStorage.getItem("email")){
                                                            setLf_TooDeleted(row.id)
                                                            setOpenDeleteModal(true)
                                                        }else{
                                                            alert("Vous n'êtes pas le proprietaire de ce timeSheet !")
                                                        }
                                                    }}
                                        >
                                            <DeleteOutlineIcon color="error" fontSize="small"/>
                                        </IconButton>
                                    </TableCell>
                                    {/*<TableCell style={{ width: "7%" }} align="center">
                                {moment(row.created_at).format("DD/MM/YYYY") || ""}
                            </TableCell>*/}
                                    <TableCell style={{ width: "9%" }} align="center">
                                        {moment(row.newTime.date).format("DD/MM/YYYY") || ""}
                                    </TableCell>
                                    <TableCell style={{ width: "20%" }} align="center">
                                        {
                                            row.newTime.dossier_client ? (row.newTime.dossier_client.name && row.newTime.dossier_client.name !== "") ? (row.newTime.client || "") + " - " + row.newTime.dossier_client.name :
                                                (row.newTime.client || "" ) : (row.newTime.client || "")
                                        }
                                    </TableCell>

                                    <TableCell style={{ width: "28%" }} align="center">
                                        {row.newTime.description}
                                    </TableCell>
                                    <TableCell style={{ width: "15%" }} align="center">
                                        {renderOA_user(row.newTime.utilisateurOA)}
                                    </TableCell>
                                    <TableCell style={{ width: "13%" }} align="center">
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
                                {
                                    lf_client_search_ID !== "" &&
                                    <TableCell align="left" style={{width:"5%"}}/>
                                }
                                <TableCell align="center" style={{width:"6%",fontWeight:600}}/>
                                <TableCell align="center" style={{width:"9%",fontWeight:600}}/>
                                <TableCell align="center" style={{width:"20%",fontWeight:600}}/>
                                <TableCell align="center" style={{width:"28%",fontWeight:600}}/>
                                <TableCell  style={{width:"15%",fontWeight:600}}/>
                                <TableCell align="center" style={{width:"13%",fontWeight:600}}/>
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
                    </Table> :

                    <Table aria-label="collapsible table" style={{marginTop:20}}>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell  style={{fontWeight:"bold"}} >Client</TableCell>
                                <TableCell  style={{fontWeight:"bold"}} >Dossier</TableCell>
                                <TableCell  style={{fontWeight:"bold"}} >Associes</TableCell>
                                <TableCell  style={{fontWeight:"bold"}} >Equipe</TableCell>
                                <TableCell align="center" style={{fontWeight:"bold"}} >Ajouté par </TableCell>
                                <TableCell align="center"  style={{fontWeight:"bold"}} >Total(h)</TableCell>
                                <TableCell align="center"  style={{fontWeight:"bold"}} >Total(CHF)</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                groupedFormatedArray.map((dossier,key) => (
                                    <React.Fragment>
                                        <TableRow className={classes.root}>
                                            <TableCell>
                                                <IconButton aria-label="expand row" size="small" onClick={() => {
                                                    setOpen(!open)
                                                    setExapndedRowKey(key)
                                                }}>
                                                    {open && key === exapndedRowKey ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell style={{width:"18%"}} >{dossier[0].newTime.client}</TableCell>
                                            <TableCell style={{width:"18%"}} >{dossier[0].newTime.dossier_client.name}</TableCell>
                                            <TableCell style={{width:"12%"}} >
                                                <AltAvatarGroup appearance="stack" maxCount={4} borderColor="#C0C0C0" isTooltipDisabled={false} size="small"
                                                                data={(dossier[0].newTime.dossier_client.team || []).filter(x => x.type === "lead").map((item,key) => ({
                                                                    name:item.email,
                                                                    src:(props.OA_contacts || []).find(x => x.email === item.email) ? ((props.OA_contacts || []).find(x => x.email === item.email)).imageUrl : "" ,
                                                                    appearance:"circle",
                                                                    size:"small",
                                                                    borderColor:"#C0C0C0"
                                                                }))}
                                                />
                                            </TableCell>
                                            <TableCell style={{width:"12%"}} >
                                                <AltAvatarGroup appearance="stack" maxCount={4} borderColor="#C0C0C0" isTooltipDisabled={false} size="small"
                                                                data={(dossier[0].newTime.dossier_client.team || []).filter(x => x.type === "team").map((item,key) => ({
                                                                    name:item.email,
                                                                    src:(props.OA_contacts || []).find(x => x.email === item.email) ? ((props.OA_contacts || []).find(x => x.email === item.email)).imageUrl : "" ,
                                                                    appearance:"circle",
                                                                    size:"small",
                                                                    borderColor:"#C0C0C0"
                                                                }))}
                                                />
                                            </TableCell>
                                            <TableCell style={{width:"20%"}}>{renderOA_user(dossier[0].user_email)}</TableCell>
                                            {
                                                renderTotalHours_CHF_byFolder(dossier)
                                            }

                                        </TableRow>

                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                                                <Collapse in={open && key === exapndedRowKey} timeout="auto" unmountOnExit>
                                                    <Box margin={1}>
                                                        <div style={{marginLeft:30,border:"2px solid dodgerblue",padding:20,borderRadius:7.5,maxHeight:600,overflow:"overlay"}}>
                                                            <h5 style={{textDecoration:"underline"}}>{dossier.length === 0 ? "Aucun timesheet pour ce dossier" : dossier.length + " TimeSheet non encore facturés"}</h5>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell align="center" style={{fontWeight:"bold"}} >
                                                                            <div style={{display:"flex"}}>
                                                                                <IconButton size="small" onClick={() => {
                                                                                    sort_in_folder_form === "asc" ? setSort_in_folder_form("desc") : setSort_in_folder_form("asc")
                                                                                }}
                                                                                >
                                                                                    {
                                                                                        sort_in_folder_form === "asc" ? <ArrowDropDownIcon fontSize="small"/> : <ArrowDropUpIcon fontSize="small"/>
                                                                                    }

                                                                                </IconButton>
                                                                                <div>Date</div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell align="center" style={{fontWeight:"bold"}} >Description</TableCell>
                                                                        <TableCell align="center" style={{fontWeight:"bold"}} >Utilisateur OA</TableCell>
                                                                        <TableCell align="center" style={{fontWeight:"bold"}} >Taux horaire</TableCell>
                                                                        <TableCell align="center" style={{fontWeight:"bold"}} >Durée</TableCell>
                                                                        <TableCell align="center" style={{fontWeight:"bold"}} >Total</TableCell>
                                                                    </TableRow>

                                                                </TableHead>
                                                                <TableBody>
                                                                    {(dossier || []).sort( (a,b) => {
                                                                        var c = new Date(a.newTime.date);
                                                                        var d = new Date(b.newTime.date);
                                                                        return sort_in_folder_form === "asc" ?  d-c : c-d;})
                                                                        .map((lf,key) => (

                                                                        <TableRow key={key}>
                                                                                <TableCell component="th" scope="row" align="center" style={{width:"10%"}} >
                                                                                    {moment(lf.newTime.date).format("DD-MM-YYYY")}
                                                                                </TableCell>
                                                                                <TableCell align="center" style={{width:"30%"}}>{lf.newTime.description}</TableCell>
                                                                                <TableCell align="center" style={{width:"20%"}}>{renderOA_user(lf.newTime.utilisateurOA)}</TableCell>
                                                                                <TableCell align="center" style={{width:"10%"}}>{lf.newTime.rateFacturation + " CHF"}</TableCell>
                                                                                <TableCell align="center" style={{width:"10%"}}>
                                                                                    {utilFunctions.formatDuration(lf.newTime.duree.toString())}
                                                                                </TableCell>
                                                                                <TableCell align="center" style={{width:"10%"}}>
                                                                                    {(lf.newTime.duree * parseInt(lf.newTime.rateFacturation)).toFixed(2)}&nbsp;CHF
                                                                                </TableCell>
                                                                            </TableRow>

                                                                    ))}
                                                                    <TableRow style={{padding:7}}>
                                                                        <TableCell align="center" style={{width:"10%"}}/>
                                                                        <TableCell align="center" style={{width:"30%",fontWeight:600}}/>
                                                                        <TableCell align="center" style={{width:"20%",fontWeight:600}}/>
                                                                        <TableCell align="center" style={{width:"10%",fontWeight:600}}/>
                                                                        {renderTotalHours_CHF_byFolder(dossier)}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                            <div className="row mt-3">
                                                                <div className="col-md-4">
                                                                    <h5>Partner validant cette facture</h5>
                                                                    <MuiSelect
                                                                        labelId="demo-mutiple-chip-label14545"
                                                                        id="demo-mutiple-chip34688"
                                                                        style={{ width: 250 }}
                                                                        value={partner_facture}
                                                                        onChange={(e) => {
                                                                            setPartner_facture(e.target.value)
                                                                        }}
                                                                        MenuProps={Data.MenuProps}
                                                                    >
                                                                        {props.OA_contacts.filter(x => x.type && x.type === "associe").map((contact, key) => (
                                                                            <MenuItem
                                                                                key={key}
                                                                                value={contact.email}>
                                                                                <div
                                                                                    className="row align-items-center justify-content-center">
                                                                                    <Avatar
                                                                                        alt=""
                                                                                        src={contact.imageUrl} />
                                                                                    <div>{contact.nom + ' ' + contact.prenom}</div>
                                                                                </div>
                                                                            </MenuItem>
                                                                        ))}
                                                                    </MuiSelect>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <h5>Date de la facture</h5>
                                                                    <DatePicker
                                                                        calendarIcon={
                                                                            <img
                                                                                alt=""
                                                                                src={calendar}
                                                                                style={{ width: 20 }} />}
                                                                        onChange={(e) => {
                                                                            setFacture_date(e)
                                                                        }}
                                                                        value={facture_date}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mt-3" style={{textAlign:"right"}}>
                                                                <AtlButton
                                                                    appearance="primary"
                                                                    isDisabled={partner_facture === ""}
                                                                    onClick={() => {
                                                                        if(partner_facture === ""){
                                                                            alert("Vous devez sélectionner un partner pour la validation !")
                                                                        }else{
                                                                            setCheck_all(false)
                                                                            let sheets_to_add = [];
                                                                            (dossier || []).map((item,key) => {
                                                                                sheets_to_add.push({
                                                                                    id:item.id,
                                                                                    created_at:item.created_at,
                                                                                    uid:item.uid,
                                                                                    user_email:item.user_email,
                                                                                    newTime:item.newTime
                                                                                })
                                                                            })
                                                                            let client_folder={id:sheets_to_add[0].newTime.dossier_client.folder_id,name:sheets_to_add[0].newTime.dossier_client.name}
                                                                            console.log(client_folder)
                                                                            props.onClickFacture(lf_client_search,client_folder,moment(facture_date).format("YYYY-MM-DD HH:mm:ss"),partner_facture,sheets_to_add);
                                                                            setTimeout(() => {
                                                                                selected.map((item,key) => {
                                                                                    if(typeof item.checked === "boolean"){
                                                                                        item.checked = false;
                                                                                    }
                                                                                })
                                                                                setPartner_facture("")
                                                                                setFacture_date(new Date())
                                                                            },250);
                                                                        }

                                                                    }}>
                                                                    Envoyer la facture pour validation</AtlButton>
                                                            </div>
                                                        </div>
                                                    </Box>

                                                </Collapse>
                                            </TableCell>
                                        </TableRow>

                                    </React.Fragment>
                                ))
                            }
                            <TableRow>
                                <TableCell/>
                                <TableCell style={{width:"18%"}}/>
                                <TableCell  style={{width:"18%"}}/>
                                <TableCell  style={{width:"12%"}}/>
                                <TableCell  style={{width:"12%"}}/>
                                <TableCell  style={{width:"20%"}}/>
                                {renderTotalHours_CHF_allFolders(groupedFormatedArray)}
                            </TableRow>
                        </TableBody>
                    </Table>
            }

            {
                selected.length > 0 &&
                <div>
                    <div>
                        <div className="mt-1" style={{justifyContent:"flex-end",display:"flex"}}>
                            <span className="badge badge-blue text-white p-2 font-14">Total heures: {utilFunctions.formatDuration(nb_heures.toString())}</span>
                            <span className="badge badge-blue text-white p-2 font-14 ml-2">Total: {total.toFixed(2)+ " CHF"}</span>
                        </div>

                        <div className="row mt-1 ml-2">
                            <div className="col-md-6">
                                <h5>Partner validant cette facture</h5>
                                <MuiSelect
                                    labelId="demo-mutiple-chip-label14545"
                                    id="demo-mutiple-chip34688"
                                    style={{ width: 300 }}
                                    value={partner_facture}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setPartner_facture(e.target.value)
                                    }}
                                    MenuProps={Data.MenuProps}
                                >
                                    {props.OA_contacts.filter(x => x.type && x.type === "associe").map((contact, key) => (
                                        <MenuItem
                                            key={key}
                                            value={contact.email}>
                                            <div
                                                className="row align-items-center justify-content-center">
                                                <Avatar
                                                    alt=""
                                                    src={contact.imageUrl} />
                                                <div>{contact.nom + ' ' + contact.prenom}</div>
                                            </div>
                                        </MenuItem>
                                    ))}
                                </MuiSelect>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2" style={{textAlign:"right"}}>
                        <AtlButton
                            appearance="primary"
                            isDisabled={partner_facture === ""}
                            onClick={() => {
                                if(partner_facture === ""){
                                    alert("Vous devez sélectionner un partner pour la validation !")
                                }else{

                                    let sheets_to_add = [];
                                    setCheck_all(false)
                                    selected.map((item,key) => {
                                        sheets_to_add.push({
                                            id:item.id,
                                            created_at:item.created_at,
                                            uid:item.uid,
                                            user_email:item.user_email,
                                            newTime:item.newTime
                                        })
                                    })
                                    let client_folder={id:lf_dossier_search,name:sheets_to_add[0].newTime.dossier_client.name}
                                    console.log(client_folder)
                                    props.onClickFacture(lf_client_search,client_folder,moment(facture_date).format("YYYY-MM-DD HH:mm:ss"),partner_facture,sheets_to_add);
                                    setTimeout(() => {
                                        selected.map((item,key) => {
                                            if(typeof item.checked === "boolean"){
                                                item.checked = false;
                                            }
                                        })
                                        setPartner_facture("")
                                    },250);

                                }

                            }}>
                            Envoyer la facture pour validation</AtlButton>
                    </div>
                </div>

            }

            <Dialog open={showUpdateModal} maxWidth="xl" fullWidth={true}    onClose={() => {
                setShowUpdateModal(false)
            }}
                    aria-labelledby="form-dialog-title"
            >
                <DialogTitle disableTypography id="form-dialog-title">
                    <Typography variant="h6">Modifier ligne facture</Typography>
                    <IconButton aria-label="close"
                                style={{position: 'absolute', right: 5, top: 5, color: "#c0c0c0"}}
                                onClick={() => {

                                    setShowUpdateModal(false)
                                }}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent>

                    <div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <h5>Durée</h5>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <Autosuggest
                                                suggestions={timeSuggestions}
                                                onSuggestionsFetchRequested={onTimeSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={onTimeSuggestionsClearRequested}
                                                onSuggestionSelected={(event, {suggestion}) => console.log(suggestion)}
                                                getSuggestionValue={suggestion => suggestion}
                                                renderSuggestion={suggestion => (
                                                    <div>{suggestion}</div>)}
                                                inputProps={inputSuggProps}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <h5>Nom du client</h5>
                                        <div
                                            style={{display: "flex"}}>
                                            <SelectSearch
                                                options={
                                                    props.annuaire_clients_mandat.map(({Nom, Prenom, Type, imageUrl, ID}) =>
                                                        ({
                                                            value: ID,
                                                            name: Nom + " " + (Prenom || ""),
                                                            ContactType: Type,
                                                            ContactName: Nom + " " + (Prenom || ""),
                                                            imageUrl: imageUrl
                                                        }))
                                                }
                                                value={toUpdated_client_id}
                                                renderOption={renderSearchOption}
                                                search
                                                placeholder="Chercher votre client"
                                                onChange={e => {
                                                    setToUpdated_client_id(e)
                                                    let findClientFname = props.annuaire_clients_mandat.find(x => x.ID === e)
                                                    setToUpdated_client(findClientFname.Nom + ' ' + (findClientFname.Prenom || ''))
                                                    let findClientTempo = props.clientsTempo.find(x => x.ID_client === e);
                                                    if(findClientTempo){
                                                        setSelectedClientFolders(findClientTempo.folders || [])
                                                        setToUpdated_dossier_client({facturation:{language:""},name:""})
                                                    }else{
                                                        setSelectedClientFolders([])
                                                        setToUpdated_dossier_client({facturation:{language:""},name:""})
                                                    }
                                                }}
                                            />
                                        </div>
                                        <h5 style={{marginTop:30}}>Dossier du client </h5>
                                        <MuiSelect
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{ width: 300 }}
                                            value={toUpdated_dossier_client_id}
                                            onChange={(e) => {
                                                setToUpdated_dossier_client_id(e.target.value)
                                                setToUpdated_dossier_client(selectedClientFolders.find(x => x.folder_id === e.target.value) || {facturation:{language:""},name:""})
                                                //setX_update(!x_update)
                                            }}
                                        >
                                            {
                                                selectedClientFolders.map((item,key) => (
                                                    <MenuItem key={key} value={item.folder_id}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </MuiSelect>

                                    </div>

                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div style={{width: "100%"}}>
                                        <h5>Date</h5>
                                        <DatePicker
                                            calendarIcon={
                                                <img alt="" src={calendar} style={{width: 20}}/>}
                                            onChange={(e) => {
                                                console.log(e)
                                                setToUpdated_date(e)
                                            }}
                                            value={toUpdated_date}
                                        />

                                    </div>

                                </div>

                            </div>
                            <div className="row mt-3" style={{marginBottom:80}}>
                                <div className="col-md-6">
                                    <div>
                                        <div>
                                            <h5>Description</h5>
                                        </div>
                                        <textarea
                                            className="form-control "
                                            id="duree"
                                            style={{width: "85%"}}
                                            name="duree"
                                            rows={5}
                                            value={toUpdated_desc}
                                            onChange={(e) => {
                                                setToUpdated_desc(e.target.value)
                                            }}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <h6>Utilisateur OA </h6>
                                    </div>

                                    <MuiSelect
                                        labelId="demo-simple-select-label4545"
                                        id="demo-simple-select4545"
                                        style={{width: 300}}
                                        onChange={(e) => {
                                            setToUpdated_OAUser(e.target.value)

                                            let OA_contacts = props.OA_contacts;
                                            let OA_contact = "";
                                            OA_contacts.map((contact, key) => {
                                                if (contact && contact.email && contact.email === e.target.value) {
                                                    OA_contact = contact
                                                }
                                            })
                                            setToUpdated_rate(OA_contact.rateFacturation || "")
                                        }}
                                        value={toUpdated_OAUser}
                                    >
                                        {props.OA_contacts.map((contact, key) => (
                                            <MenuItem
                                                key={key}
                                                value={contact.email}>
                                                <div style={{display:"flex"}}>
                                                    <Avatar style={{marginLeft:10}}
                                                            alt=""
                                                            src={contact.imageUrl} />
                                                    <div style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </MuiSelect>



                                    <div className="mt-3">
                                        <h6>
                                            Taux horaire
                                        </h6>
                                        <Input
                                            className="form-control "
                                            id="duree68797"
                                            style={{width: "300px"}}
                                            name="duree68797"
                                            type="text"
                                            endAdornment={
                                                <InputAdornment
                                                    position="end">CHF:Hr</InputAdornment>}

                                            value={toUpdated_rate}
                                            onChange={(e) => {
                                                setToUpdated_rate(e.target.value)
                                            }}/>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop:20,textAlign:"right"}}>
                                <AtlButton
                                    isDisabled={toUpdated_client_id === "" || toUpdated_rate === "" || toUpdated_OAUser === '' || toUpdated_dossier_client.name === ""  }
                                    appearance="primary"
                                    onClick={() => {
                                        let newItem = selectedRow;
                                        newItem.checked = "false"
                                        newItem.newTime.utilisateurOA = toUpdated_OAUser
                                        newItem.newTime.rateFacturation = toUpdated_rate
                                        newItem.newTime.dossier_client = toUpdated_dossier_client
                                        newItem.newTime.description = toUpdated_desc
                                        newItem.newTime.date = moment(toUpdated_date).format("YYYY-MM-DD :HH:mm:ss")
                                        newItem.newTime.client_id = toUpdated_client_id
                                        newItem.newTime.client = toUpdated_client

                                        let time = duration;
                                        let regexFormat = /^[0-9]{1,2}h[0-9]{0,2}$/
                                        if(regexFormat.test(time) === true){
                                            let duree = utilFunctions.durationToNumber(time);
                                            if(duree === 0){
                                                props.openSnackbar('error', 'La durée doit etre supérieur à zéro !');
                                            }else{
                                                newItem.newTime.duree = utilFunctions.durationToNumber(duration)
                                                //console.log(newItem)
                                                props.updateLigneFacture(newItem.id,newItem)
                                                setShowUpdateModal(false)
                                            }
                                        }else{
                                            props.openSnackbar('error', 'Le format de la durée est invalide ! Veuillez utiliser le format --h--');
                                        }
                                    }}>
                                    Modifier</AtlButton>
                            </div>
                        </div>

                </DialogContent>
            </Dialog>


            <ModalTransition>
                {openDeleteModal === true && (
                    <Modal
                        actions={[
                            { text: 'Supprimer', onClick: () => {
                                    props.deleteLigneFacture(lf_TooDeleted)
                                    setLf_TooDeleted("")
                                    setOpenDeleteModal(false)
                                } },
                            { text: 'Annuler', onClick: () => {
                                    setLf_TooDeleted("")
                                    setOpenDeleteModal(false)
                                }},
                        ]}
                        onClose={() => {
                            setLf_TooDeleted("")
                            setOpenDeleteModal(false)
                        }}
                        heading="Vous êtes sur le point de supprimer cette ligne !"
                        appearance="danger"
                    >

                    </Modal>
                )}
            </ModalTransition>

        </div>

    );
}