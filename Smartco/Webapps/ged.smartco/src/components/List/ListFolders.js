import React from "react";
import FolderIcon from '@material-ui/icons/Folder';
import "./List.css"

export default function ListFolders(props) {


    return(
        <div>
            <h5 style={{marginTop:20}}>Dossiers({props.items.length || 0})</h5>
            <div className="folders_container">
                {
                    props.items.map((folder,key) =>
                        <div key={key} className="folder_item_container">
                            <div className="folder_item" onDoubleClick={(e) => {
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