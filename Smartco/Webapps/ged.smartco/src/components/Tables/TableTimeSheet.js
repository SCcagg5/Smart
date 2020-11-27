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
import {Avatar, Checkbox, Input, Select as MuiSelect} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from '@material-ui/icons/Edit';
import DatePicker from "react-date-picker";
import calendar from "../../assets/icons/calendar_icon.jpg";
import AtlButton from "@atlaskit/button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Autosuggest from "react-autosuggest";
import SelectSearch from "react-select-search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Data from "../../data/Data";
import userAvatar from "../../assets/images/users/user4.jpg";
import entIcon from "../../assets/images/entreprise-icon.png";
import moment from "moment";
import data from '../../data/Data';
import main_functions from '../../controller/main_functions';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

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

    //const [lf_client_search, setLf_client_search] = React.useState(props.annuaire_clients_mondat[0].Nom + ' ' + (props.annuaire_clients_mondat[0].Prenom || '') );
    const [lf_client_search, setLf_client_search] = React.useState("");
    const [lf_client_search_ID, setLf_client_search_ID] = React.useState("");
    const [lf_dossier_search, setLf_dossier_search] = React.useState("");
    const [lf_oaUser_search, setLf_oaUser_search] = React.useState("");
    const [lf_sdate_search, setLf_sdate_search] = React.useState(null);
    const [lf_edate_search, setLf_edate_search] = React.useState(null);

    const [partner_facture, setPartner_facture] = React.useState("");
    const [facture_date, setFacture_date] = React.useState(new Date());
    const [check_all, setCheck_all] = React.useState(false);
    const [client_folder, setClient_folder] = React.useState("");
    const [x_update, setX_update] = React.useState(false);



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);



    const searchFilter = props.lignesFactures.filter((lf) => ( ( (lf.newTime.client.trim() === lf_client_search.trim() ) || lf_client_search === "") &&
      ( lf.newTime.dossier_client && (lf.newTime.dossier_client.name === lf_dossier_search ) || lf_dossier_search === "") &&
      ( lf.newTime && lf.newTime.utilisateurOA && (lf.newTime.utilisateurOA === lf_oaUser_search ) || lf_oaUser_search === "") &&
      ( (lf_sdate_search !== null && ( new Date(lf.newTime.date).getTime() >= lf_sdate_search.getTime())) || lf_sdate_search === null  ) &&
      ( (lf_edate_search !== null && (new Date(lf.newTime.date).getTime() <= (moment(lf_edate_search).set({hour:23,minute:59}).unix() * 1000) ))  || lf_edate_search === null  )
    ))

    searchFilter.sort( (a,b) => {
        var c = new Date(a.newTime.date);
        var d = new Date(b.newTime.date);
        return d-c;
    });

    const selected = searchFilter.filter((lf) => ( lf.checked === true ));
    let total = 0;
    let nb_heures = 0;
    selected.map((item,key) => {
        let value = parseInt(item.newTime.rateFacturation) * item.newTime.duree;
        total = total + value;
        nb_heures = nb_heures + item.newTime.duree;
    })

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
                <img alt="" src={Oa_user.imageUrl || ""} style={{width:40,height:40,objectFit:"contain"}}/>
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



    let selected_client_folders = [];
    selected.map((item,key) => {
        if(item.newTime.dossier_client && item.newTime.dossier_client.name && item.newTime.dossier_client.name !== "" &&
          !selected_client_folders.includes(item.newTime.dossier_client.name) ){
            selected_client_folders.push(item.newTime.dossier_client.name)
        }
    })


    let clientsTempo = props.clientsTempo || [];
    let all_opened_mandats = [];
    all_opened_mandats.push({value:"",label:""})
    if(lf_client_search === ""){
        clientsTempo.map((tmp,key) => {
            (tmp.folders || []).map((f,i) => {
                all_opened_mandats.push({
                    value:f.name,
                    label:f.name
                })
            })
        })
    }else{
        clientsTempo.map((tmp,key) => {
            (tmp.folders || []).map((f,i) => {
                if(tmp.ID === lf_client_search_ID){
                    all_opened_mandats.push({
                        value:f.name,
                        label:f.name
                    })
                }
            })
        })
    }
    console.log(all_opened_mandats)


    /*let client_folders = props.client_folders || [];
    let selected_client = client_folders.Content ? client_folders.Content.folders.find(x => x.name === lf_client_search) : undefined
    let selected_client_folders = selected_client ?  selected_client.Content.folders : [];*/

    return (

        <div>
            <div className="row mt-1" style={{border:"2px solid #f0f0f0",padding:15,paddingLeft:10}}>
                <div className="col-md-12">
                    <div align="right">
                        <AtlButton
                          onClick={() => {
                              setLf_sdate_search(null)
                              setLf_edate_search(null)
                              setLf_client_search("")
                              setLf_oaUser_search("")
                              setLf_dossier_search("")
                              setLf_client_search_ID("")
                          }}
                        >Initialiser</AtlButton>
                    </div>
                </div>
                <div className="col-md-12">
                    <h5>Rechercher</h5>
                </div>
                <div className="col-md-12">
                    <div style={{display:"flex"}}>
                        <h5>De</h5>
                        <div style={{marginLeft:10,marginRight:10}}>
                            <DatePicker
                              calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                              onChange={(e) => {
                                  setLf_sdate_search(e)
                              }}
                              value={lf_sdate_search}
                              dayPlaceholder="dd"
                              monthPlaceholder="mm"
                              yearPlaceholder="yyyy"
                            />
                        </div>
                        <h5>à</h5>
                        <div style={{marginLeft:10,marginRight:10}}>
                            <DatePicker
                              calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                              onChange={(e) => {
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
                <div className="col-md-5 mt-2">
                    <div style={{display:"flex"}}>
                        <h5 style={{marginRight:10}}>Par client</h5>
                        <SelectSearch
                          className="select-search"
                          options={
                              props.annuaire_clients_mondat.map(({ Nom, Prenom, Type, imageUrl, ID }) =>
                                ({
                                    value: Nom + ' ' + (Prenom || ''),
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
                              setLf_client_search(e)
                              setLf_client_search_ID(main_functions.getClientID_ByName(e,props.annuaire_clients_mondat))
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
                                onChange={(event) =>
                                  setLf_dossier_search(event.target.value)
                                }
                                value={lf_dossier_search}
                        >
                            {
                                all_opened_mandats.map((item,key) =>
                                  <option key={key} value={item.value}>{item.label}</option>
                                )
                            }


                        </select>
                    </div>
                </div>
                <div className="col-md-12 mt-1">
                    <div style={{display:"flex"}}>
                        <h5 >Par utilisateur OA</h5>
                        <MuiSelect
                          labelId="demo-mutiple-chip-label14545"
                          id="demo-mutiple-chip34688"
                          style={{ width: 250,marginLeft:10,marginRight:10 }}
                          value={lf_oaUser_search}
                          onChange={(e) => {
                              console.log(e.target.value);
                              setLf_oaUser_search(e.target.value)
                          }}
                          MenuProps={Data.MenuProps}
                        >
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
            </div>
            {
                selected.length > 0 &&
                <h5 style={{marginTop:20,color:"blue"}}>
                    {selected.length === 1 ? "Une ligne facture sélectionnée" : selected.length + " lignes factures sélectionnées"}
                </h5>
            }
            <Table className={classes.table} aria-label="custom pagination table" style={{marginTop:20}}>
                <TableHead>
                    <TableRow style={{padding:10}}>
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
                        <TableCell align="center" style={{width:"5%",fontWeight:600}}>Actions</TableCell>
                        <TableCell align="center" style={{width:"8%",fontWeight:600}}>Date</TableCell>
                        <TableCell align="center" style={{width:"17%",fontWeight:600}}>Nom du dossier</TableCell>
                        <TableCell align="center" style={{width:"25%",fontWeight:600}}>Description</TableCell>
                        <TableCell  style={{width:"20%",fontWeight:600}}>Utilisateur OA</TableCell>
                        <TableCell align="center" style={{width:"10%",fontWeight:600}}>Taux horaire</TableCell>
                        <TableCell align="center" style={{width:"10%",fontWeight:600}}>Durée</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? searchFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : searchFilter).map((row,key) => (
                        <TableRow key={key} style={{padding:10}}>
                            <TableCell align="left"   style={{width:"5%",backgroundColor:searchFilter[key].checked && searchFilter[key].checked === true ? "rgba(220, 0, 78, 0.08)" : "transparent"}}>
                                <div className="media align-items-center">
                                        <Checkbox  checked={searchFilter[key].checked ? searchFilter[key].checked : false} onChange={(event) => {
                                            setX_update(!x_update)
                                            searchFilter[key].checked = event.target.checked
                                            if(searchFilter[key].checked === false) setCheck_all(false)
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
                            <TableCell style={{ width: "8%" }} align="center">
                                {moment(row.newTime.date).format("DD/MM/YYYY") || ""}
                            </TableCell>
                            <TableCell style={{ width: "17%" }} align="center">
                                {
                                    row.newTime.dossier_client ? row.newTime.dossier_client.name !== "" ? (row.newTime.client || "") + " - " + row.newTime.dossier_client.name :
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
                                <div>{row.newTime.duree+"h"}</div>
                            </TableCell>
                        </TableRow>
                    ))}

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
            {
                selected.length > 0 &&
                  <div>
                      <div>
                          <div className="row mt-1">
                              <div className="col-md-4">
                                  <h5>Partner validant cette facture</h5>
                                  <MuiSelect
                                    labelId="demo-mutiple-chip-label14545"
                                    id="demo-mutiple-chip34688"
                                    style={{ width: 250 }}
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
                              <div className="col-md-4">
                                  <h5>Dossier client</h5>
                                  <MuiSelect
                                    labelId="demo-simple-select-label68798"
                                    id="demo-simple-select776879"
                                    style={{ width: '100%' }}
                                    value={client_folder}
                                    onChange={(e) => {
                                        setClient_folder(e.target.value)
                                    }}
                                  >
                                      {
                                          selected_client_folders.map((folder,key) => (
                                            <MenuItem key={key}
                                              value={folder}>{folder}</MenuItem>
                                          ))
                                      }
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
                      </div>
                      <div className="mt-3" style={{textAlign:"right"}}>
                          <span className="badge badge-blue text-white p-2 font-16">Total heures: {nb_heures.toFixed(2) + " h"}</span><br/>
                          <span className="badge badge-blue text-white p-2 font-16" style={{marginTop:7}}>Total: {total+ " CHF"}</span>
                      </div>
                      <div className="mt-3" style={{textAlign:"right"}}>
                          <AtlButton
                            appearance="primary"
                            isDisabled={partner_facture === ""}
                            onClick={() => {
                                if(partner_facture === ""){
                                    alert("Vous devez sélectionner un partner pour la validation")
                                }else{
                                    setCheck_all(false)
                                    props.onClickFacture(lf_client_search,client_folder,moment(facture_date).format("YYYY-MM-DD"),partner_facture,selected)
                                }

                            }}>
                              Envoyer la facture pour validation</AtlButton>
                      </div>
                  </div>

            }



            <Dialog open={showUpdateModal} maxWidth="xl" onClose={() => {
                setShowUpdateModal(!showUpdateModal)
            }}
                    aria-labelledby="form-dialog-title"
            >
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
                                            <h5>Nom du client</h5>
                                            <div
                                                style={{display: "flex"}}>
                                                <SelectSearch
                                                    options={
                                                        props.annuaire_clients_mondat.map(({Nom, Prenom, Type, imageUrl}) =>
                                                            ({
                                                                value: Nom + " " + (Prenom || ""),
                                                                name: Nom + " " + (Prenom || ""),
                                                                ContactType: Type,
                                                                ContactName: Nom + " " + (Prenom || ""),
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
                                            <h6>Utilisateur OA </h6>
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
                                    <div className="col-md-4">
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
                                            {
                                                data.lf_templates.map((item,key) =>
                                                  <option key={key} value={item.value}>{item.label}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div style={{marginTop:20,textAlign:"right"}}>
                                    <AtlButton
                                        appearance="primary"
                                        onClick={() => {

                                            let time = lf_toUpdated.newTime.duree;
                                            let timeFormated = '';
                                            if(typeof time !== "number"){
                                                if (time.indexOf(':') > -1) {
                                                    timeFormated = parseFloat(time.replace(':', '.'));
                                                } else if (time.indexOf('.') > -1) {
                                                    timeFormated = parseFloat(time);
                                                } else if (time.indexOf(':') === -1 && time.indexOf('.') === -1) {
                                                    timeFormated = parseInt(time);
                                                } else {
                                                    props.openSnackbar('error', 'Le format de la durée est invalide !');
                                                }
                                                if ((typeof timeFormated) !== 'number' || isNaN(timeFormated)) {
                                                    props.openSnackbar('error', 'Le format de la durée est invalide !');
                                                } else {
                                                    if(timeFormated === 0 ){
                                                        props.openSnackbar('error', 'La durée doit etre supérieur à 0 ');
                                                    }else {
                                                        lf_toUpdated.newTime.duree = timeFormated;
                                                    }
                                                }
                                            }else{

                                            }

                                            console.log(lf_toUpdated)
                                            setShowUpdateModal(false)
                                            props.updateLigneFacture(lf_toUpdated.uid,lf_toUpdated)

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
