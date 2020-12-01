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
import countryList from "../../tools/countryList";
import Select from 'react-select';
import FolderIcon from '@material-ui/icons/Folder';
import Data from "../../data/Data";
import moment from "moment";


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

export default function TableSociete(props) {

    const classes = useStyles2();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [textSearch, setTextSearch] = React.useState("");
    const [searchByState, setSearchByState] = React.useState("");
    const [searchByType, setSearchByType] = React.useState("");
    const [searchBySector, setSearchBySector] = React.useState("");
    const [searchByPays, setSearchByPays] = React.useState("");  
    const [searchByLead, setSearchByLead] = React.useState("");
    const [selectedSearchLettre, setSelectedSearchLettre] = React.useState("");

    const searchFilter= props.societes.filter((annuaire) => (  (annuaire.Nom+" "+annuaire.Prenom).toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 &&
         (annuaire.Nom+" "+annuaire.Prenom).toLowerCase().startsWith(selectedSearchLettre.toLowerCase()) &&
        (annuaire.Type === searchByType || searchByType === "") &&
        ((annuaire.isActif && annuaire.isActif  === searchByState) || searchByState === "") &&
        ((annuaire.secteur && annuaire.secteur === searchBySector)  || searchBySector === "" ) &&
        ((annuaire.PrimaryAddressCountry && annuaire.PrimaryAddressCountry === searchByPays)  || searchByPays === "" ) &&
        ((annuaire.facturation && annuaire.facturation.collaborateur_lead === searchByLead)  || searchByLead === "" )

    ))

    /*searchFilter.sort( (a,b) => {
        let fname1 = a.Nom || '' + ' ' + a.Prenom || ''
        let fname2 = b.Nom || '' + ' ' + b.Prenom || ''
        if(fname1.toLowerCase().trim()  < fname2.toLowerCase().trim()) { return -1; }
        if(fname1.toLowerCase().trim() > fname2.toLowerCase().trim()) { return 1; }
        return 0;
    });*/


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
            <h4 className="mt-0 mb-1">Clients (Mandat)</h4>
            <div className="mt-2" style={{textAlign:"right"}}>
                <div className="text-sm-right">
                    <button
                         onClick={() => {
                             props.onAddBtnClick()
                         }}
                         className="btn btn-danger waves-effect waves-light mb-2">
                        <i className="mdi mdi-plus-circle mr-1" /> Ajouter
                    </button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-xl-12">
                    <div className="row">
                        <div className="col">
                            <div className="page-title-box">
                                <div className="row">
                                    <div className="col-md-2 bg-danger text-center " style={{width: "10%"}}>
                                        <h4 style={{color: "white"}}>OA Legal</h4>
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
                                            placeholder="Chercher par nom"
                                            value={textSearch}
                                            onChange={(e)=>  setTextSearch(e.target.value) }/>

                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["A","B","C"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["D","E","F"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["G","H","I"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["J","K","L"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["M","N","O"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
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
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 2 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-1" style={{borderLeftColor:"#a6a6a6",borderLeftStyle:"solid",borderLeftWidth:1,display:"flex"}}>
                                        {
                                            ["W","X","Y","Z"].map((l,key) =>
                                                <h5 key={key} className={selectedSearchLettre === l ? "over-search-lettre-selected over-search-lettre " :"over-search-lettre"}
                                                    onClick={() => {selectedSearchLettre === l ? setSelectedSearchLettre("") : setSelectedSearchLettre(l)}}>
                                                    {l}{key < 3 && "-"}
                                                </h5>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <h6>Par statut</h6>
                                        <select className="form-control custom-select" style={{width:350}}
                                                value={searchByState} onChange={(e) => {
                                                    if(e.target.value === "true"){
                                                        setSearchByState(true)
                                                    }else if(e.target.value === "false"){
                                                        setSearchByState(false)
                                                    }else{
                                                        setSearchByState("")
                                                    }
                                        } }
                                        >
                                            <option value={""}/>
                                            <option  value="true" >Actif</option>
                                            <option  value="false">Non actif</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <h6>Par type</h6>
                                        <select className="form-control custom-select" style={{width:350}}
                                                value={searchByType} onChange={(e) => {
                                                 setSearchByType(e.target.value)
                                                 console.log(e.target.value)
                                        }}
                                        >
                                            {
                                                Data.contactTypes.map((contact,key) =>
                                                    <option key={key} value={contact.value}>{contact.label}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Par secteur</h6>
                                        <select className="form-control custom-select" style={{width:350}}
                                                value={searchBySector} onChange={(e) => setSearchBySector(e.target.value) }
                                        >
                                            {
                                                Data.secteurs.map((secteur,key) =>
                                                    <option key={key} value={secteur}>{secteur}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <h6>Par pays</h6>
                                        <select className="form-control custom-select" style={{width:350}}
                                                value={searchByPays} onChange={(e) => setSearchByPays(e.target.value) }
                                        >
                                            {
                                                countryList.map((pay,key) =>
                                                    <option key={key} value={pay.Name}>{pay.Name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Par collaborateur lead sur le dossier</h6>
                                        <Select
                                            defaultValue={searchByLead}
                                                options={contactSelectOptions}
                                                closeMenuOnSelect={true}
                                                isMulti={false}
                                                hideSelectedOptions={true}
                                                styles={{
                                                    container: (provided, state) => ({
                                                        ...provided,
                                                        width:350
                                                    }),
                                                    menuPortal: styles => ({ ...styles, zIndex: 9999 })
                                                }}
                                                menuPortalTarget={document.body}
                                                onChange={(e) => {
                                                    console.log(e.value)
                                                    setSearchByLead(e.value)
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
                                        <TableCell style={{width:"20%",fontWeight:600}}>Nom</TableCell>
                                        <TableCell  style={{width:"20%",fontWeight:600}}>Prénom</TableCell>
                                        <TableCell  style={{width:"15%",fontWeight:600}}>Téléphone</TableCell>
                                        <TableCell  style={{width:"15%",fontWeight:600}}>Date de création</TableCell>
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
                                                        src={row.imageUrl ? row.imageUrl : row.Type === "0" ? entIcon : userAvatar}
                                                        alt=""/>

                                                    <div className="ml-1">{row.Type === "0" ? "Société" : "Personne physique"}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} >
                                                {row.Nom || ""}
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} >
                                                {row.Prenom || ""}
                                            </TableCell>
                                            <TableCell style={{ width: "15%" }} >
                                                {row.phone || ""}
                                            </TableCell>
                                            <TableCell style={{ width: "15%" }} >
                                                {row.created_at ? moment(row.created_at).format("DD/MM/YYYY") : ""}
                                            </TableCell>
                                            <TableCell style={{ width: "15%" }} >
                                                <IconButton aria-label="Modifier" title="Modifier" color="default" size="small"
                                                            onClick={() => props.onEditClick(row,key)}>
                                                    <EditIcon fontSize="small" style={{color:"#1a73e8"}}/>
                                                </IconButton>
                                                {/*<IconButton aria-label="folder" title="folder" color="default" size="small" onClick={() => {
                                                    //props.onFolderClick(row.folder_id)
                                                }}>
                                                    <FolderIcon fontSize="small" />
                                                </IconButton>*/}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow  style={{ height: 40,textAlign:"center"}}>
                                            <th style={{marginTop:15}}>Aucun résultat trouvé !</th>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'Tous', value: -1 }]}
                                            colSpan={3}
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

        </div>

    );
}
