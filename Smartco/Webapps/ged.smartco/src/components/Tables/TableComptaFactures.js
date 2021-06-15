import React, {useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import AtlButton, {ButtonGroup as AltButtonGroup} from '@atlaskit/button';
import DatePicker from 'react-date-picker';
import calendar from '../../assets/icons/calendar_icon.jpg';
import SelectSearch from 'react-select-search';
import main_functions from '../../controller/main_functions';
import SmartService from "../../provider/SmartService";
import rethink from "../../controller/rethink";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CircularProgress from "@material-ui/core/CircularProgress";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {makeStyles} from "@material-ui/core/styles";
import userAvatar from "../../assets/images/users/user4.jpg";
import {Avatar, Select as MuiSelect} from "@material-ui/core";
import Data from "../../data/Data";
import MenuItem from "@material-ui/core/MenuItem";
import Toggle from "@atlaskit/toggle";

const db_name = "OA_LEGAL";
/*const odoo_id = "796dc0ed-8b4a-40fd-aeff-7ce26ee1bcf9"*/

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

export default function ComptaInvoicesTable(props) {

    const [client_search, setClient_search] = React.useState("");
    const [lf_dossier_search, setLf_dossier_search] = React.useState("");
    const [lf_type_search, setLf_type_search] = React.useState("");
    const [lf_processed_search, setLf_processed_search] = React.useState("");
    const [lf_oaUser_search, setLf_oaUser_search] = React.useState("");
    const [sdate_search, setSdate_search] = React.useState(null);
    const [edate_search, setEdate_search] = React.useState(null);
    const [statut_search, setStatut_search] = React.useState("tous");
    const [x_update, setX_update] = React.useState(false);


    const renderClientCases = (client_id) => {
        let cases = [];
        let clientsTempo = props.clients_tempo || [];
        clientsTempo.map((tmp, key) => {
            (tmp.folders || []).map((f, i) => {
                if (tmp.ID_client === client_id) {
                    cases.push({
                        value: f.folder_id,
                        label: f.name
                    })
                }
            })
        })

        return (
            cases.map((item, key) => (
                <option key={key} value={item.value}>{item.label}</option>
            ))
        )
    }

    let factures = (props.factures || []).filter(x => x.facture_odoo_id);
    //console.log(factures)

    let searchFilter = factures.filter((lf) => (((lf.client_id === client_search) || client_search === "") &&
        (lf.client_folder && (lf.client_folder.id === lf_dossier_search) || lf_dossier_search === "") &&
        ((lf.type && (lf.type === lf_type_search)) || (!lf.type && lf_type_search === "facture") || lf_type_search === "") &&
        ((lf.processed && (lf.processed.toString() === lf_processed_search)) || (!lf.processed && lf_processed_search === "0" )  || lf_processed_search === "") &&
        ((lf.partner === lf_oaUser_search) || lf_oaUser_search === "") &&
        ((sdate_search !== null && (new Date(lf.created_at).getTime() >= sdate_search.getTime())) || sdate_search === null) &&
        ((edate_search !== null && (new Date(lf.created_at).getTime() <= (moment(edate_search).set({
            hour: 23,
            minute: 59
        }).unix() * 1000))) || edate_search === null) &&
        ((statut_search === lf.statut) || (statut_search === "tous" && lf.statut !== "paid") || (statut_search === "accepted" && lf.statut !== "wait" && lf.statut !== "paid"))
    ))

    searchFilter.sort((a, b) => {
        var c = new Date(a.created_at);
        var d = new Date(b.created_at);
        return d - c;
    });

    return (
        <TableContainer component={Paper} style={{minHeight: 650, padding: 30}}>

            <div>
                <div className="row mt-1" style={{border: "2px solid #f0f0f0", padding: 15, paddingLeft: 10}}>
                    <div className="col-md-12">
                        <div align="right">
                            <AtlButton
                                onClick={() => {
                                    setSdate_search(null)
                                    setEdate_search(null)
                                    setClient_search("")
                                    setLf_dossier_search("")
                                    setLf_oaUser_search("")
                                    setLf_processed_search("")
                                    setLf_type_search("")
                                }}
                            >Initialiser</AtlButton>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5 style={{marginTop:-15}}>Rechercher</h5>
                    </div>

                    <div className="col-md-12">
                        <div style={{display: "flex"}}>
                            <h5>De</h5>
                            <div style={{marginLeft: 10, marginRight: 10}}>
                                <DatePicker
                                    calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                                    onChange={(e) => {
                                        setSdate_search(e)
                                    }}
                                    value={sdate_search}
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
                                        setEdate_search(e)
                                    }}
                                    value={edate_search}
                                    dayPlaceholder="dd"
                                    monthPlaceholder="mm"
                                    yearPlaceholder="yyyy"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mt-2">
                        <div style={{display: "flex"}}>
                            <h5 style={{marginRight: 10}}>Par client</h5>
                            <SelectSearch
                                className="select-search"
                                options={
                                    (props.annuaire_clients_mandat || []).map(({Nom, Prenom, Type, imageUrl, ID}) =>
                                        ({
                                            value: ID,
                                            name: Nom + ' ' + (Prenom || ''),
                                            ContactType: Type,
                                            ContactName: Nom + ' ' + (Prenom || ''),
                                            imageUrl: imageUrl
                                        }))
                                }
                                value={client_search}
                                renderOption={main_functions.renderSearchOption}
                                search
                                placeholder="Sélectionner.."
                                onChange={e => {
                                    console.log(e)
                                    setClient_search(e)
                                    let cases = [];
                                    let clientsTempo = props.clients_tempo || [];
                                    clientsTempo.map((tmp, key) => {
                                        (tmp.folders || []).map((f, i) => {
                                            if (tmp.ID_client === e) {
                                                cases.push({
                                                    value: f.folder_id,
                                                    label: f.name
                                                })
                                            }
                                        })
                                    })
                                    console.log(cases)
                                    setLf_dossier_search(cases.length > 0 ? cases[0].value : "")
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <div style={{display: "flex"}}>
                            <h5 style={{marginRight: 10}}>Par dossier</h5>
                            <select className="form-control custom-select" style={{width: 230, marginLeft: 10}}
                                    onChange={(event) => {
                                        setLf_dossier_search(event.target.value)
                                    }}
                                    value={lf_dossier_search}
                            >
                                {
                                    renderClientCases(client_search)
                                }


                            </select>
                        </div>
                    </div>

                    <div className="col-md-6 mt-2">
                        <div style={{display:"flex"}}>
                            <h5 >Par utilisateur OA</h5>
                            <MuiSelect
                                labelId="demo-mutiple-chip-label14545"
                                id="demo-mutiple-chip34688"
                                style={{ width: 250,marginLeft:10,marginRight:10 }}
                                value={lf_oaUser_search}
                                onChange={(e) => {
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
                                {(props.contacts || []).map((contact, key) => (
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
                    <div className="col-md-6 mt-2">
                        <div style={{display: "flex"}}>
                            <h5>Par statut</h5>
                            <select
                                style={{width: 250, marginLeft: 10}}
                                className="form-control custom-select"
                                id="titre"
                                name="titre"
                                placeholder="Titre"
                                value={statut_search}
                                onChange={(e) => {
                                    setStatut_search(e.target.value)
                                }}
                            >
                                <option value={"tous"} label={"Tous"}/>
                                <option value={"paid"} label={"Payée"}/>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6 mt-2">
                        <div style={{display: "flex"}}>
                            <h5 style={{marginRight: 10}}>Par type</h5>
                            <select className="form-control custom-select" style={{width: 230, marginLeft: 10}}
                                    onChange={(event) => {
                                        setLf_type_search(event.target.value)
                                    }}
                                    value={lf_type_search}
                            >
                                <option value=""/>
                                <option value="facture">Facture</option>
                                <option value="provision">Provision</option>
                                <option value="avance_frais">Avance de frais</option>


                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <div style={{display: "flex"}}>
                            <h5 style={{marginRight: 10}}>Traitée/Non traitée</h5>
                            <select className="form-control custom-select" style={{width: 230, marginLeft: 10}}
                                    onChange={(event) => {
                                        setLf_processed_search(event.target.value)
                                    }}
                                    value={lf_processed_search}
                            >
                                <option value=""/>
                                <option value={1}>Traitée</option>
                                <option value={0}>Non traitée</option>


                            </select>
                        </div>
                    </div>
                </div>

                {
                    searchFilter.length > 0 ?
                        <Table aria-label="collapsible table" style={{marginTop: 20}} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Type</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Date</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Ajoutée par</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Client</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Nom du dossier</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Montant</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Paiement</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Actions</TableCell>
                                    <TableCell align="center" style={{fontWeight: "bold"}}>Traitée</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    searchFilter.map((row, key) => (
                                        <Row key={key} row={row} index={key}

                                             openFacture={props.openFacture}
                                             openPdf={props.openPdf}
                                             client_folders={props.client_folders} clients_tempo={props.clients_tempo}
                                             annuaire_clients_mandat={props.annuaire_clients_mandat}
                                             contacts={props.contacts || []}
                                             openSnackbar={props.openSnackbar}
                                             show_odoo_facture={props.show_odoo_facture}
                                             rerender={props.rerender}
                                             updateSearch={(client_id, folder_id) => {
                                                 setClient_search(client_id)
                                                 setLf_dossier_search(folder_id)
                                             }}
                                             updateFacture={props.updateFacture}
                                        />
                                    ))
                                }
                            </TableBody>
                        </Table> :

                        <h6 style={{margin: 20}}>Aucune facture trouvée</h6>
                }
            </div>

        </TableContainer>
    );
}


function Row(props) {

    const classes = useRowStyles();
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [x_update, setX_update] = React.useState(false);

    useEffect(() => {
        if((!row.amount_untaxed && !row.amount_tax && !row.amount_total) || (!row.paid || row.paid === "false") || row.statut !== "wait"){
            getDeatilsOdooFacture()
        }
    }, [getDeatilsOdooFacture]);

    const getDeatilsOdooFacture = () => {
        if (row.facture_odoo_id) {
            SmartService.details_facture_odoo(row.odoo_id, localStorage.getItem("token"), localStorage.getItem("usrtoken"), row.facture_odoo_id).then(detailsRes => {
                if (detailsRes.succes === true && detailsRes.status === 200) {
                    row.amount_untaxed = detailsRes.data[0].amount_untaxed;
                    row.amount_tax = detailsRes.data[0].amount_tax ? detailsRes.data[0].amount_tax : 0 ;
                    row.amount_total = detailsRes.data[0].amount_total;
                    row.currency_id = detailsRes.data[0].currency_id;
                    if (detailsRes.data[0].state === "paid") {
                        row.paid = "true"
                        row.statut = "paid"
                    } else {
                        row.paid = "false"
                    }
                    props.rerender()
                    rethink.update("test", 'table("factures").get(' + JSON.stringify(row.id) + ').update(' + JSON.stringify(row) + ')', db_name, false).then(updateRes => {

                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log(detailsRes.error)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    };

    const renderOA_user = (email) => {
        let Oa_user = "";
        (props.contacts || []).map((contact,key) => {
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

    let total = 0;
    let nb_heures = 0;
    (row.lignes_facture || []).map((ligne, key) => {
        total = total + (ligne.newTime.duree * parseFloat(ligne.newTime.rateFacturation));
        nb_heures = nb_heures + ligne.newTime.duree;
    });

    return (
        <React.Fragment>
            <TableRow style={{borderBottom: row.type ? "1px solid rgba(224, 224, 224, 1)" : "none"}}
                      className={classes.root}>
                <TableCell>
                    {/*{
                        !row.type &&
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    }*/}
                </TableCell>
                <TableCell onClick={() => {console.log(row)}}
                           align="center">{row.type && row.type === "provision" ? "Provision" : row.type === "avance_frais" ? "Avance de frais" : "Facture"}</TableCell>
                <TableCell align="center" style={{minWidth:150}}>{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
                <TableCell align="center">
                    {renderOA_user(row.created_by)}
                </TableCell>
                <TableCell align="center">{row.client}</TableCell>
                <TableCell align="center" style={{textDecoration: "underline", cursor: "pointer"}}
                           onClick={() => {
                               props.updateSearch(row.client_id, row.client_folder.id)
                           }}
                >
                    {row.client_folder.name}
                </TableCell>

                <TableCell align="center">
                    {
                        row.amount_total ? (row.amount_total + " " + row.currency_id[1]) :
                            row.statut === "wait" ? "__" :
                                <CircularProgress size={15} color={"secondary"}/>
                    }
                </TableCell>

                <TableCell align="center">
                    {
                        row.statut === "wait" ? "__" :
                            row.paid ? row.paid === "true" ? "Payée" : "Non payée" :
                                <CircularProgress size={15} color={"secondary"}/>
                    }
                </TableCell>

                <TableCell align="center" style={{
                    minWidth: 120,
                    display: row.statut === "wait" || row.statut === "accepted" || row.statut === "paid" ? "block" : "flex"
                }}
                >
                    {
                        (row.statut === "accepted" || row.statut === "paid") && (!row.type) &&
                        [
                            <div>
                                <IconButton key={0} aria-label="folder" title="Afficher la facture" color="default"
                                            size="small" onClick={() => {
                                    props.openFacture(row.file_id)
                                }}>
                                    <PictureAsPdfIcon fontSize="small" style={{color: "red"}}/>
                                </IconButton>
                                <h6 style={{fontSize: "0.5rem"}}>Facture</h6>
                            </div>

                        ]

                    }
                    {
                        row.statut === "wait" &&
                        <IconButton aria-label="folder" title="Supprimer" color="default" size="small"
                                    onClick={() => {
                                        if (row.statut === "wait") {
                                            props.showDeleteModal(row.id)
                                        }
                                    }}
                        >
                            <DeleteOutlineIcon fontSize="small" style={{color: "red"}}/>
                        </IconButton>
                    }
                    {
                        (row.statut === "confirmed" || row.statut === "paid") && row.type === "provision" &&
                        [
                            <div style={{marginRight: 3, maxWidth: 50}}>
                                <IconButton key={0} aria-label="folder" title="Afficher le pdf de provision"
                                            color="default" size="small" onClick={() => {
                                    props.openPdf(row.details_provision.b64_pdf_oa, row.details_provision.pdf_oa_name, "pdf")
                                }}>
                                    <PictureAsPdfIcon fontSize="small" style={{color: "red"}}/>
                                </IconButton>
                                <h6 style={{fontSize: "0.5rem"}}>Pdf de provision</h6>
                            </div>,
                            <div style={{maxWidth: 50}}>
                                <IconButton key={1} aria-label="folder" title="Afficher la facture" color="default"
                                            size="small" onClick={() => {
                                    props.show_odoo_facture(row.facture_odoo_id, row.facture_acces_token, row.date_facture,row.odoo_id)
                                }}>
                                    <PictureAsPdfIcon fontSize="small" style={{color: "red"}}/>
                                </IconButton>
                                <h6 style={{fontSize: "0.5rem"}}>Facture de provision</h6>
                            </div>

                        ]

                    }
                    {
                        (row.statut === "confirmed" || row.statut === "paid") && row.type === "avance_frais" &&
                        [
                            <div style={{marginRight: 3, maxWidth: 50}}>
                                <IconButton key={0} aria-label="folder" title="Afficher le pdf de provision"
                                            color="default" size="small" onClick={() => {
                                    props.openPdf(row.details_avancefrais.file, row.details_avancefrais.fileName, "pdf")
                                }}>
                                    <PictureAsPdfIcon fontSize="small" style={{color: "red"}}/>
                                </IconButton>
                                <h6 style={{fontSize: "0.5rem"}}>Document téléchargé</h6>
                            </div>,
                            <div style={{maxWidth: 50}}>
                                <IconButton key={1} aria-label="folder" title="Afficher la facture" color="default"
                                            size="small" onClick={() => {
                                    props.show_odoo_facture(row.facture_odoo_id, row.facture_acces_token, row.date_facture,row.odoo_id)
                                }}>
                                    <PictureAsPdfIcon fontSize="small" style={{color: "red"}}/>
                                </IconButton>
                                <h6 style={{fontSize: "0.5rem"}}>Facture d'avance de frais</h6>
                            </div>

                        ]

                    }

                </TableCell>
                <TableCell align="center">
                    <Toggle id="sett-large" size="large"
                            isChecked={row.processed && row.processed === 1}
                            onChange={ event => {
                                let item = row;
                                item.processed = !item.processed ? 1 : item.processed === 1 ? 0 : 1
                                props.updateFacture(item.id,item)
                            }}
                    />
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
