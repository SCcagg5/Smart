import React from "react";
import FolderIcon from '@material-ui/icons/Folder';
import "./List.css"

export default function ListFolders(props) {


    return(
        <div>
            <h5 style={{marginTop:15}}>Dossiers({props.items.length})</h5>
            <div className="folders_container">
                {
                    props.items.map((folder,key) =>
                        <div key={key} className="folder_item_container">
                            <div className="folder_item" onDoubleClick={() => {
                                props.onDoubleClickFolder(folder)
                            }}>
                                <div>
                                    <FolderIcon style={{color:"rgb(95, 99, 104)"}}/>
                                </div>
                                <div style={{marginTop:4,marginLeft:8,color:"rgb(95, 99, 104)"}}>
                                    {folder.name}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )

}