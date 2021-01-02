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
import userAvatar from "../../assets/images/users/user4.jpg";
import entIcon from "../../assets/images/entreprise-icon.png";
import EditIcon from "@material-ui/icons/Edit";
import TableHead from '@material-ui/core/TableHead';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Data from "../../data/Data";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import SmartService from '../../provider/SmartService';
//import SmartService from '../../provider/masterNodeService';
import { Checkbox } from '@atlaskit/checkbox';
import main_functions from "../../controller/main_functions";
import moment from "moment";
import { CSVReader } from 'react-papaparse'
import verfiForms from "../../tools/verifForms";



const { Panel } = Collapse;

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

let fileUpload = {};
let csvFileUpload = {};

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



export default function TableSociete(props) {

    const buttonRef = React.createRef()

    const classes = useStyles2();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [textSearch, setTextSearch] = React.useState("");
    const [searchByState, setSearchByState] = React.useState("");
    const [searchByType, setSearchByType] = React.useState("");
    const [searchBySocietyName, setSearchBySocietyName] = React.useState("");
    const [selectedSearchLettre, setSelectedSearchLettre] = React.useState("");
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [toRemoveClient_id, setToRemoveClient_id] = React.useState("");
    const [delete_folder_ged, setDelete_folder_ged] = React.useState(false);


    const searchFilter= props.societes.filter( annuaire => (  (annuaire.contactName.trim().toLowerCase().indexOf(textSearch.toLowerCase()) !== -1) &&
        ((annuaire.societyName.trim()).toLowerCase().indexOf(searchBySocietyName.toLowerCase()) !== -1) &&
         (annuaire.contactName.trim()).toLowerCase().startsWith(selectedSearchLettre.toLowerCase()) &&
        (annuaire.type === searchByType || searchByType === "") &&
        ((annuaire.isActif && annuaire.isActif  === searchByState) || searchByState === "")
    ))


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, searchFilter - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const contactSelectOptions=[];
    contactSelectOptions.push({label:"Aucun",value:""})
    props.contacts.map((contact,key) => {
        contactSelectOptions.push({value:contact.email,
            label:
              <div>
                <img alt="" src={contact.imageUrl || null} style={{width:30,height:30,objectFit:"contain"}}/>
                {"  "}{contact.nom+" "+contact.prenom}
              </div>
        })
    })



    return (
        <div>
            <h4 className="mt-0 mb-1">Clients</h4>
            <div className="mt-2" style={{textAlign:"right"}}>
                <div className="text-sm-right">
                    <button
                         onClick={() => {
                             props.onAddBtnClick()
                         }}
                         className="btn btn-danger waves-effect waves-light mb-2">
                        <i className="mdi mdi-plus-circle mr-1" /> Ajouter
                    </button>
                    <button style={{marginLeft:10}}
                            onClick={(e) => {
                                if(props.societes.length > 0 ){
                                    const r = window.confirm("Attention ! La liste des clients déja existante sera supprimé ");
                                    if (r === true) {
                                        if (buttonRef.current) {
                                            buttonRef.current.open(e)
                                        }
                                    }
                                }else{
                                    if (buttonRef.current) {
                                        buttonRef.current.open(e)
                                    }
                                }
                            }}
                            className="btn btn-success waves-effect waves-light mb-2">
                        <i className="mdi mdi-import" />Importer(.csv .xlsx)
                    </button>
                    <CSVReader
                        ref={buttonRef}
                        onFileLoad={(data) => {
                            let lignes = [];
                            for(let i = 1 ; i < data.length -1 ; i++){
                                    let type = data[i].data[0];
                                    let email = data[i].data[1];
                                    let contactName = data[i].data[2];
                                    let societyName = data[i].data[3];
                                    let phone = data[i].data[4];
                                    let adress = data[i].data[5];
                                    lignes.push({
                                        type:type,
                                        email:email,
                                        contactName:contactName,
                                        societyName:societyName,
                                        phone:phone,
                                        adress:adress
                                    })
                            }
                            props.onImportClick(lignes)
                        }}
                        onError={(err) => console.log(err)}
                        noDrag noProgressBar noClick
                        style={{dropArea:{display:"none"}}}
                    />

                    <button style={{marginLeft:10}}
                            onClick={() => {
                                let data = props.societes;
                                data.map((item,key) => {
                                    item.contactName = JSON.stringify(item.contactName)
                                    item.societyName = JSON.stringify(item.societyName)
                                    item.adress = JSON.stringify(item.adress);
                                })
                                main_functions.exportAnnuaire_clients_To_CSVFile(data,"Liste_clients_"+moment().format("DD-MM-YYYY-HH:mm")+".csv")
                            }}
                            className="btn btn-light waves-effect waves-light mb-2">
                        <i className="mdi mdi-export" />Exporter
                    </button>
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
                <div className="col-xl-12" style={{minWidth:900}}>
                    <div className="row">
                        <div className="col">
                            <div className="page-title-box">
                                <div className="row">
                                    <div className="col-md-2  text-center " style={{width: "10%",backgroundColor:"rgb(0, 119, 182)"}}>
                                        <h4 style={{color: "white"}}>Mandats</h4>
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
                    <div style={{marginTop:20}}>
                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            className="site-collapse-custom-collapse"
                        >
                            <Panel header="Recherche avancée" key="1" className="site-collapse-custom-panel">
                                <div className="row" style={{border:"2px solid #dee2e6"}}>
                                    <div className="col-md-3" >
                                        <input
                                            className="form-control"
                                            style={{width:"100%",border:0}}
                                            id="search"
                                            name="search"
                                            type="text"
                                            placeholder="Par nom & prénom"
                                            value={textSearch}
                                            onChange={(e)=>  {
                                                setPage(0)
                                                setTextSearch(e.target.value)
                                            } }/>

                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["A","B","C"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {
                                                        setPage(0)
                                                        selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["D","E","F"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {
                                                        setPage(0)
                                                        selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["G","H","I"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {
                                                        setPage(0)
                                                        selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["J","K","L"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {
                                                        setPage(0)
                                                        selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["M","N","O"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {
                                                        setPage(0)
                                                        selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["P","Q","R"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["S","T","U"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {
                                                        setPage(0)
                                                        selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["W","X","Y","Z"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {
                                                        setPage(0)
                                                        selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 3 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <h6>Par statut</h6>
                                        <select className="form-control custom-select" style={{width:350}}
                                                value={searchByState} onChange={(e) => {
                                                    setPage(0)
                                                    if(e.target.value === "true"){
                                                        setSearchByState("true")
                                                    }else if(e.target.value === "false"){
                                                        setSearchByState("false")
                                                    }else{
                                                        setSearchByState("")
                                                    }
                                        }}>
                                            <option value={""}/>
                                            <option  value="true" >Actif</option>
                                            <option  value="false">Non actif</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Par type</h6>
                                        <select className="form-control custom-select" style={{width:350}}
                                                value={searchByType} onChange={(e) => {
                                            setPage(0)
                                            setSearchByType(e.target.value)
                                        }}
                                        >
                                            {
                                                Data.contactTypes.map((contact,key) =>
                                                    <option key={key} value={contact.value}>{contact.label}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <h6>Par nom de société</h6>
                                        <input type="text" className="form-control" value={searchBySocietyName} style={{width:350}}
                                               onChange={(e) => {
                                                   setPage(0)
                                                   setSearchBySocietyName(e.target.value)
                                               }}
                                        />
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <Table className={classes.table} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow style={{padding:10}}>
                                        <TableCell style={{width:"15%",fontWeight:600}}>Type</TableCell>
                                        <TableCell style={{width:"20%",fontWeight:600}}>Nom & Prénom</TableCell>
                                        <TableCell  style={{width:"20%",fontWeight:600}}>Société</TableCell>
                                        <TableCell  style={{width:"20%",fontWeight:600}}>Adresse</TableCell>
                                        <TableCell  style={{width:"15%",fontWeight:600}}>Téléphone</TableCell>
                                        {/*<TableCell  style={{width:"15%",fontWeight:600}}>Date de création</TableCell>*/}
                                        <TableCell  style={{width:"15%",fontWeight:600}}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0 ? searchFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                                        searchFilter).map((row,key) => (
                                        <TableRow key={key} style={{padding:10}}>
                                            <TableCell component="th" scope="row" style={{width:"15%"}}>
                                                <div
                                                    className="media align-items-center">
                                                    <img
                                                        className=" rounded-circle text-center"
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                            objectFit: "cover"
                                                        }}
                                                        src={row.imageUrl ? row.imageUrl : row.type === "0" ? entIcon : userAvatar}
                                                        alt=""/>

                                                    <div className="ml-1">{row.type === "0" ? "Société" : "Personne physique"}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} >
                                                {row.contactName || ""}
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} >
                                                {row.societyName || ""}
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} >
                                                {row.adress || ""}
                                            </TableCell>
                                            <TableCell style={{ width: "15%" }} >
                                                {row.phone || ""}
                                            </TableCell>
                                            {/*<TableCell style={{ width: "15%" }} >
                                                {row.created_at ? moment(row.created_at).format("DD/MM/YYYY") : ""}
                                            </TableCell>*/}
                                            <TableCell style={{ width: "15%" }} >
                                                <IconButton aria-label="Modifier" title="Modifier" color="default" size="small"
                                                            onClick={() => props.onEditClick(row,key)}>
                                                    <EditIcon fontSize="small" style={{color:"#1a73e8"}}/>
                                                </IconButton>
                                                <IconButton aria-label="delete" title="Supprimer" color="default" size="small" onClick={() => {
                                                    if(localStorage.getItem("client_folder_id") || localStorage.getItem("client_shared_folder_id")  ){
                                                        //setOpenDeleteModal(true)
                                                        //setToRemoveClient_id(row.ID)
                                                    }else{
                                                        alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
                                                    }
                                                }}>
                                                    <DeleteOutlineIcon color="error"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow  style={{ height: emptyRows * 50,textAlign:"center"}}>
                                            <TableCell style={{width:"25%"}}>
                                                <h6 style={{marginTop:30}}>Aucun client encore ajouté !</h6>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter style={{textAlign:"center"}}>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
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
                        </div>
                    </div>
                </div>
            </div>



            <ModalTransition>
                {openDeleteModal === true && (
                  <Modal
                    actions={[
                        { text: 'Supprimer', onClick: () => {
                            let clients_mandats = props.clients_tempo || [];
                            let find = clients_mandats.find(x => x.ID_client === toRemoveClient_id);
                            if(find){

                                let new_clients_mandat = clients_mandats.filter(x => x.ID_client !== toRemoveClient_id);
                                props.update_client_tempo_all(new_clients_mandat);
                                let new_clients = props.societes.filter(x => x.ID !== toRemoveClient_id);
                                props.update_clients(new_clients)
                                props.openSnackbar("success","Client supprimé avec succès")
                                setOpenDeleteModal(false)

                                if(find.folder_id && find.folder_id !== "" && delete_folder_ged === true){
                                    SmartService.deleteFile(find.folder_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( ok => {
                                        console.log(ok)
                                        if (ok.succes === true && ok.status === 200) {
                                            props.reloadGed()
                                        }else{
                                            if(ok.error === "Invalid rights"){
                                                props.openSnackbar("error","Vous n'avez pas le droit de supprimer le dossier du client dans la ged !")
                                            }else{
                                                props.openSnackbar("error",ok.error)
                                            }
                                        }
                                    }).catch(err => console.log(err))
                                }
                            }else{
                                let new_clients = props.societes.filter(x => x.ID !== toRemoveClient_id);
                                props.update_clients(new_clients)
                                props.openSnackbar("success","Client supprimé avec succès")
                                setOpenDeleteModal(false)
                            }
                            } },
                        { text: 'Annuler', onClick: () => {
                            setOpenDeleteModal(false)
                                setToRemoveClient_id("")
                                setDelete_folder_ged(false)
                            }},
                    ]}
                    onClose={() => {
                        setOpenDeleteModal(false)
                        setToRemoveClient_id("")
                        setDelete_folder_ged(false)
                    }}
                    heading="Vous êtes sur le point de supprimer ce client"
                    appearance="danger"
                  >

                      <Checkbox
                        isChecked={delete_folder_ged}
                        label="Voulez-vous supprimer les dossiers de ce client dans la ged aussi ?"
                        onChange={() => {
                            setDelete_folder_ged(!delete_folder_ged)
                        }}
                        name="checkbox-default-1"
                        value="checkbox-default-1"
                      />

                  </Modal>
                )}
            </ModalTransition>

        </div>

    );
}
