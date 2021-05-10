import React from "react";
import FolderIcon from '@material-ui/icons/Folder';
import "./List.css"
import MuiBackdrop from "../Loading/MuiBackdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ListFolders(props) {


    return(
        <div>

            <div style={{display:"flex"}}>
                <h5 style={{marginTop:20,marginRight:12}}>
                    Dossiers {(props.items && props.items.length > 0) ? ("(" + props.items.length + ")") : ""}
                </h5>
                {
                    !props.items &&
                    <CircularProgress size={12} color={"secondary"} style={{marginTop:21}}/>
                }

            </div>



            <div className="folders_container">
                {
                    (props.items || []).map((folder,key) =>
                        <div key={key} className="folder_item_container">
                            <div className="folder_item" onClick={(e) => {
                                props.onDoubleClickFolder(folder)
                            }}>
                                <div>
                                    <FolderIcon style={{color:"rgb(95, 99, 104)"}}/>
                                </div>
                                <div style={{marginTop:4,marginLeft:8,color:"rgb(95, 99, 104)"}}>
                                    {folder.name || folder.title}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )

}
