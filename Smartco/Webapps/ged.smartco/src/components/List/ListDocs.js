import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import moment from "moment";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Typography from "@material-ui/core/Typography";
import NewFileIcon from "@material-ui/icons/AttachFile";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Menu from "@material-ui/core/Menu";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SmartService from "../../provider/SmartService";

export default function ListDocs(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [doc, setDoc] = useState("");

    return(
        <div>
            {
                props.viewMode === "list" &&
                <div className="list_view_item">
                    <div
                        style={{width: 56}}>
                        <h6 style={{color: "#000"}}>Type</h6>
                    </div>
                    <div
                        style={{width: 300}}>
                        <h6 style={{color: "#000"}}>Nom</h6>
                    </div>
                    <div
                        style={{width: 215}}>
                        <h6 style={{color: "#000"}}>Propriétaire</h6>
                    </div>
                    <div
                        style={{width: 200}}>
                        <h6 style={{color: "#000"}}>Date de création</h6>
                    </div>
                    <div
                        style={{width: 150}}>
                        <h6 style={{color: "#000"}}>Taille</h6>
                    </div>
                </div>
            }
            {
                (props.docs || []).map((item, key) =>
                    props.viewMode === "grid" ?
                        <div key={key} className="cf_itemDoc">
                            <span className="cf-itemDoc_preview" onClick={() => props.onDocClick(item)} onContextMenu={(event) => {
                                event.preventDefault();
                                props.setSelectedFile(item)
                                setDoc(item)
                                setAnchorEl(event.currentTarget)
                            }}
                            >
                                <img alt=""
                                     src={item.thumbnail || require("../../assets/icons/icon-pdf.png")}
                                     className={item.thumbnail ? "cf-itemDoc_preview_image" : "cf-itemDoc_preview_staticImg"}/>
                                <div
                                    className="cf_itemDoc_preview_details">
                                    <div
                                        className="cf_itemDoc_preview_details_title">
                                        {item.name + ".pdf"}
                                    </div>
                                    <span className="badge bg-soft-warning text-warning font-weight-bolder p-1">En attente</span>
                                </div>

                            </span>
                        </div> :

                        <div key={key} className="list_view_item"
                             onClick={() => props.onDocClick(item)}  onContextMenu={(event) => {
                            event.preventDefault();
                            props.setSelectedFile(item)
                            setDoc(item)
                            setAnchorEl(event.currentTarget)
                        }}
                        >
                            <div style={{width: 56}}>
                                <IconButton
                                    color="default">
                                    <PictureAsPdfIcon
                                        style={{
                                            color: "red",
                                            backgroundColor: "#fff"
                                        }}/>
                                </IconButton>
                            </div>
                            <div
                                style={{width: 300}}>
                                <h6>{item.name + ".pdf"}</h6>
                            </div>
                            <div
                                style={{width: 215}}>
                                <h6 style={{color: "grey"}}>Moi</h6>
                            </div>
                            <div
                                style={{width: 200}}>
                                <h6 style={{color: "grey"}}>{moment(parseInt(item.date)).format("DD MMMM YYYY hh:mm")}</h6>
                            </div>
                            <div
                                style={{width: 150}}>
                                <h6 style={{color: "grey"}}>50 Ko</h6>
                            </div>
                        </div>
                )
            }
            <Menu id="right-menu_doc"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem key={1}  onClick={() => {
                    setAnchorEl(null);
                    props.showDoc(doc)
                }}  >
                    <ListItemIcon>
                        <VisibilityIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Aperçu</Typography>
                </MenuItem>
                <MenuItem key={2}  onClick={() => {
                    setAnchorEl(null);
                    props.openShareFileModal()
                }}>
                    <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Partager</Typography>
                </MenuItem>
                <MenuItem key={3}  onClick={() => {

                }}>
                    <ListItemIcon>
                        <StarBorderIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Ajouter aux favoris</Typography>
                </MenuItem>
                <MenuItem key={4}  onClick={() => {

                }}>
                    <ListItemIcon>
                        <EditIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Renommer</Typography>
                </MenuItem>
                <MenuItem key={5}  onClick={() => {
                    setAnchorEl(null);
                    props.setLoading(true)
                    SmartService.getFile(doc.id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                        if (fileRes.succes === true && fileRes.status === 200) {
                            let a = document.createElement("a"); //Create <a>
                            a.href ="data:application/pdf;base64," + fileRes.data.Content.Data
                            a.download = doc.name+".pdf"; //File name Here
                            props.setLoading(false)
                            a.click();
                        } else {
                            console.log(fileRes.error)
                        }
                    }).catch(err => console.log(err))
                }}>
                    <ListItemIcon>
                        <GetAppIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Télécharger</Typography>
                </MenuItem>
                <MenuItem key={6}  onClick={() => {
                }}>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography variant="inherit">Supprimer</Typography>
                </MenuItem>
            </Menu>
        </div>

    )

}