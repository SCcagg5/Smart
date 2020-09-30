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
import {Avatar, Checkbox, Input, Select as MuiSelect} from "@material-ui/core";
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
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import SearchClientsContainer from "../Search/SearchClientsContainer";
import Dialog from "@material-ui/core/Dialog";
import Autosuggest from "react-autosuggest";
import Timer from "react-compound-timer";
import SelectSearch from "react-select-search";
import SearchIcon from "@material-ui/icons/Search";
import RSelect from "react-select";
import InputAdornment from "@material-ui/core/InputAdornment";
import Data from "../../data/Data";
import userAvatar from "../../assets/images/users/user4.jpg";
import entIcon from "../../assets/images/entreprise-icon.png";
import moment from "moment";

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

    let lf_copy = "";

    const classes = useStyles2();
    const [showUpdateModal, setShowUpdateModal] = React.useState(false);

    const [lf_toUpdated, setLf_toUpdated] = React.useState("");
    const [toUpdated_date, setToUpdated_date] = React.useState(new Date());
    const [toUpdated_rate, setToUpdated_rate] = React.useState("");
    const [toUpdated_OAUser, setToUpdated_OAUser] = React.useState("");
    const [toUpdated_categ, setToUpdated_categ] = React.useState("");
    const [toUpdated_desc, setToUpdated_desc] = React.useState("");
    const [toUpdated_template, setToUpdated_template] = React.useState("");
    const [timeSuggestions, setTimeSuggestions] = React.useState([]);



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
                    <span style={{fontSize: 13}}>{option.ContactName}</span>
                </span>
            </button>
        );
    }

    function onInputTimeSuggChange(event, {newValue})  {
        let d = lf_toUpdated
        d.newTime.duree = newValue
        setLf_toUpdated(d)
    }

    function onTimeSuggestionsFetchRequested({value}){
        setTimeSuggestions(getTimeSuggestions(value))
    }

    function onTimeSuggestionsClearRequested(){
        setTimeSuggestions([])
    }

    const inputSuggProps = {
        placeholder: '0:1, 0:15, 0:30...',
        value: lf_toUpdated !== "" && lf_toUpdated.newTime.duree.toString().replace(".",":") ,
        onChange: onInputTimeSuggChange
    };

    const contactSelectOptions = [];
    contactSelectOptions.push({label: "Aucun", value: ""})
    props.OA_contacts.map((contact, key) => {
        contactSelectOptions.push({
            value:contact.email,
            label: <div>
                <img alt="" src={contact.imageUrl || null} style={{width: 30, height: 30, objectFit: "cover"}}/>
                {" "}{contact.nom + " " + contact.prenom}</div>
        })
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
                                <IconButton size="small" color="default" onClick={() => {
                                    lf_copy = row;
                                    setToUpdated_date(new Date(row.newTime.date))
                                    setToUpdated_rate(row.newTime.rateFacturation)
                                    setToUpdated_OAUser(row.newTime.utilisateurOA)
                                    setToUpdated_desc(row.newTime.description)
                                    setToUpdated_template(row.template)
                                    setToUpdated_categ(row.newTime.categoriesActivite)
                                    setLf_toUpdated(row)
                                    setShowUpdateModal(true)
                                }}>
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



            <Dialog open={showUpdateModal} maxWidth="xl" onClose={() => {
                setShowUpdateModal(!showUpdateModal)
            }}
                    aria-labelledby="form-dialog-title">
                <DialogTitle disableTypography id="form-dialog-title">
                    <Typography variant="h6">Modifier ligne facture</Typography>
                    <IconButton aria-label="close"
                                style={{position: 'absolute', right: 5, top: 5, color: "#c0c0c0"}}
                                onClick={() => {
                                    setShowUpdateModal(!showUpdateModal)
                                }}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent>

                    {
                        lf_toUpdated !== "" &&
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
                                    <div className="col-md-4">
                                        <div>
                                            <h5>identification / Imputation client</h5>
                                            <div
                                                style={{display: "flex"}}>
                                                <SelectSearch
                                                    options={
                                                        props.annuaire_clients_mondat.map(({ContactType, ContactName, imageUrl}) =>
                                                            ({
                                                                value: ContactName,
                                                                name: ContactName,
                                                                ContactType: ContactType,
                                                                ContactName: ContactName,
                                                                imageUrl: imageUrl
                                                            }))
                                                    }
                                                    value={lf_toUpdated.newTime.client}
                                                    renderOption={renderSearchOption}
                                                    search
                                                    placeholder="Chercher votre client"
                                                    onChange={e => {
                                                        let obj = lf_toUpdated;
                                                        obj.newTime.client = e;
                                                        setLf_toUpdated(obj)
                                                    }}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="row mt-3">
                                    <div
                                        className="col-md-4">
                                        <div>
                                            <h5>Catégorie d’activités </h5>
                                            <MuiSelect
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                style={{width: "100%"}}
                                                value={toUpdated_categ}
                                                onChange={(e) => {
                                                    setToUpdated_categ(e.target.value)
                                                    let d = lf_toUpdated
                                                    d.newTime.categoriesActivite = e.target.value
                                                    setLf_toUpdated(d)
                                                }}
                                            >
                                                <MenuItem value={"Temps facturé"}>Temps facturé</MenuItem>
                                                <MenuItem value={"Provision"}>Provision</MenuItem>
                                            </MuiSelect>
                                        </div>

                                    </div>
                                    <div
                                        className="col-md-4">
                                        <div style={{width: "100%"}}>
                                            <h5>Date</h5>
                                            <DatePicker
                                                calendarIcon={
                                                    <img alt="" src={calendar} style={{width: 20}}/>}
                                                onChange={(e) => {
                                                    console.log(e)
                                                    setToUpdated_date(e)
                                                    let d = lf_toUpdated
                                                    d.newTime.date = moment(e).format("YYYY-MM-DD")
                                                    setLf_toUpdated(d)
                                                }}
                                                value={toUpdated_date}
                                            />

                                        </div>

                                    </div>

                                </div>
                                <div className="row mt-3" style={{marginBottom:80}}>
                                    <div
                                        className="col-md-4">
                                        <div>
                                            <div>
                                                <h5>Description</h5>
                                            </div>
                                            <textarea
                                                className="form-control "
                                                id="duree"
                                                style={{width: "100%"}}
                                                name="duree"
                                                rows={5}
                                                value={toUpdated_desc}
                                                onChange={(e) => {
                                                    setToUpdated_desc(e.target.value)
                                                    let d = lf_toUpdated
                                                    d.newTime.description = e.target.value
                                                    setLf_toUpdated(d)
                                                }}/>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4">
                                        <div>
                                            <h6>Utilisateur chez OA </h6>
                                        </div>

                                        <MuiSelect
                                            labelId="demo-simple-select-label4545"
                                            id="demo-simple-select4545"
                                            style={{width: "80%"}}
                                            onChange={(e) => {
                                                setToUpdated_OAUser(e.target.value)
                                                let d = lf_toUpdated
                                                d.newTime.utilisateurOA = e.target.value;
                                                let OA_contacts = props.OA_contacts;
                                                let OA_contact = "";
                                                OA_contacts.map((contact, key) => {
                                                    if (contact && contact.email && contact.email === e.target.value) {
                                                        OA_contact = contact
                                                    }
                                                })
                                                d.newTime.rateFacturation = OA_contact.rateFacturation || ""
                                                setToUpdated_rate(OA_contact.rateFacturation || "")
                                                setLf_toUpdated(d)
                                            }}
                                            value={toUpdated_OAUser}
                                        >
                                            {props.OA_contacts.map((contact, key) => (
                                                <MenuItem
                                                    key={key}
                                                    value={contact.email}>
                                                    <div
                                                        className="row align-items-center justify-content-center">
                                                        <Avatar
                                                            alt=""
                                                            src={contact.imageUrl}/>
                                                        <div>{contact.nom + " " + contact.prenom}</div>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </MuiSelect>



                                        <div
                                            className="mt-3">
                                            <h6>
                                                Taux horaire
                                            </h6>
                                            <Input
                                                className="form-control "
                                                id="duree68797"
                                                style={{width: "100%"}}
                                                name="duree68797"
                                                type="text"
                                                endAdornment={
                                                    <InputAdornment
                                                        position="end">CHF:Hr</InputAdornment>}

                                                value={toUpdated_rate}
                                                onChange={(e) => {
                                                    setToUpdated_rate(e.target.value)
                                                    let d = lf_toUpdated
                                                    d.newTime.rateFacturation = e.target.value
                                                    setLf_toUpdated(d)
                                                }}/>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4">
                                        <h6>Choix du template </h6>
                                        <select
                                            className="form-control custom-select"
                                            value={toUpdated_template}
                                            onChange={(e) => {
                                                setToUpdated_template(e.target.value)
                                                let d = lf_toUpdated
                                                d.template = e.target.value
                                                setLf_toUpdated(d)
                                            }}>
                                            <option
                                                value="0">Description seulemnt
                                            </option>
                                            <option
                                                value="1">Nom
                                                avocat
                                                seulemnt
                                            </option>
                                            <option
                                                value="2">Nombre
                                                d'heures
                                                seulemnt
                                            </option>
                                            <option
                                                value="3">Description
                                                + Nom avocat
                                            </option>
                                            <option
                                                value="4">Description
                                                + Nombre
                                                d'heures
                                            </option>
                                            <option
                                                value="5">Description
                                                + Nom avocat
                                                + Nombre
                                                d'heures
                                            </option>
                                        </select>
                                    </div>

                                </div>
                                <div style={{marginTop:20,textAlign:"right"}}>
                                    <AtlButton
                                        appearance="primary"
                                        onClick={() => {
                                            console.log(lf_toUpdated)
                                            setShowUpdateModal(false)
                                        }}>
                                        Modifier</AtlButton>
                                </div>
                            </div>
                    }



                </DialogContent>
            </Dialog>

        </div>

    );
}
