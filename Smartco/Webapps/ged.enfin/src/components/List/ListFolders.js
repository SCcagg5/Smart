import React from "react";
import FolderIcon from '@material-ui/icons/Folder';
import "./List.css"
import main_functions from "../../controller/main_functions";
import SmartService from "../../provider/SmartService";

export default function ListFolders(props) {

    const [isDragOver, setIsDragOver] = React.useState(false);
    const [isContainerDragOver, setIsContainerDragOver] = React.useState(false);
    const [dragOverItemKey, setDragOverItemKey] = React.useState("");


    const onDrop_container = (e) => {
        e.preventDefault();e.stopPropagation();
        if(isContainerDragOver === true){
            setIsContainerDragOver(false)
            let recievedItem = JSON.parse(e.dataTransfer.getData("file"));
            if(recievedItem.typeF === "folder"){

                if(props.pathname === "/home/drive"){

                    let drive = props.reelFolders;
                    let newNode = main_functions.getFolderById((recievedItem.key || recievedItem.id),drive)
                    if(newNode){
                        props.setLoading(true)
                        SmartService.move(recievedItem.key || recievedItem.id, "",
                            localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( moveRes => {
                            if (moveRes.succes === true && moveRes.status === 200) {
                                props.setLoading(false)
                                console.log("MOVE SUCCES")
                                let newDrive = main_functions.deleteFolderFromTree(drive,recievedItem.key || recievedItem.id)
                                if(newDrive){
                                    drive = newDrive;
                                }
                                drive.push(newNode);
                                props.setReelFolders(drive)
                                props.setGedMenu(drive)
                            }else{
                                console.log(moveRes.error)
                            }
                        }).catch(err => {console.log(err)})
                    }
                }else{

                    if(props.selectedFolderFolders.find(x=> x.id === recievedItem.id || x.id === recievedItem.key) === undefined){
                        let drive = props.reelFolders;
                        let newNode = main_functions.getFolderById((recievedItem.key || recievedItem.id),drive)
                        if(newNode){
                            props.setLoading(true)
                            SmartService.move(recievedItem.key || recievedItem.id, props.selectedFolderId,
                                    localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( moveRes => {
                                    if (moveRes.succes === true && moveRes.status === 200) {
                                        props.setLoading(false)
                                        console.log("MOVE SUCCES")
                                        let newDrive = main_functions.deleteFolderFromTree(drive,recievedItem.key || recievedItem.id)
                                        if(newDrive){
                                            drive = newDrive;
                                        }
                                        main_functions.insertNodeIntoTree(drive,props.selectedFolderId ,newNode);
                                        props.setReelFolders(drive)
                                        props.setGedMenu(drive)
                                    }else{
                                        console.log(moveRes.error)
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                        }
                    }else{
                        console.log("folder to his container not permited")
                    }
                }
            }else{
                console.log("Opértion not permited")
            }

        }
        e.dataTransfer.clearData();
    }

    const onDrop_folder = (e,folder) => {
        e.preventDefault();e.stopPropagation();
        if(isDragOver === true){
            setDragOverItemKey("");setIsDragOver(false)
            let recievedItem = JSON.parse(e.dataTransfer.getData("file"));
            if((folder.id !== recievedItem.id)  && (folder.id !== recievedItem.key)  ){
                if(props.pathname === "/home/drive"){

                    if(recievedItem.typeF === "file" || recievedItem.type){
                        props.setLoading(true)
                        SmartService.move(recievedItem.key || recievedItem.id, folder.id || folder.key,
                            localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( moveRes => {
                            if (moveRes.succes === true && moveRes.status === 200) {
                                props.setLoading(false)
                                console.log("MOVE SUCCES")
                                let drive = props.reelFolders;
                                let newNode = recievedItem
                                let newDocs = props.rootFiles.filter(x => x.id !== (recievedItem.id || recievedItem.key))
                                main_functions.insertNodeIntoTree(drive,folder.id || folder.key,newNode);
                                props.setRootFiles(newDocs)
                                props.setReelFolders(drive)
                                props.setGedMenu(drive)
                            }else{
                                console.log(moveRes.error)
                            }
                        }).catch(err => {console.log(err)})

                    }
                    if(!recievedItem.type && !recievedItem.typeF){
                        let drive = props.reelFolders;
                        let newNode = main_functions.getFolderById((recievedItem.id || recievedItem.key),drive)
                        if(newNode){
                            props.setLoading(true)
                            SmartService.move(recievedItem.key || recievedItem.id, folder.id || folder.key,
                                localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( moveRes => {
                                if (moveRes.succes === true && moveRes.status === 200) {
                                    props.setLoading(false)
                                    let newSelectedFolders = props.rootFolders.filter(x => x.id !== (recievedItem.id || recievedItem.key))
                                    props.setRootFolders(newSelectedFolders)
                                    let newDrive = main_functions.deleteFolderFromTree(drive,recievedItem.id || recievedItem.key)
                                    if(newDrive){
                                        drive = newDrive;
                                    }
                                    main_functions.insertNodeIntoTree(drive,folder.id || folder.key,newNode);
                                    props.setReelFolders(drive)
                                    props.setGedMenu(drive)
                                }else{
                                    console.log(moveRes.error)
                                }
                            }).catch(err => {console.log(err)})
                        }
                    }
                }
                else{
                    if(!recievedItem.type && !recievedItem.typeF){
                        let drive = props.reelFolders;
                        let newNode = main_functions.getFolderById((recievedItem.id || recievedItem.key),drive)
                        if(newNode){
                            props.setLoading(true)
                            SmartService.move(recievedItem.key || recievedItem.id, folder.id || folder.key,
                                localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( moveRes => {
                                if (moveRes.succes === true && moveRes.status === 200) {
                                    props.setLoading(false)
                                    let newSelectedFolders = props.selectedFolderFolders.filter(x => x.id !== (recievedItem.id || recievedItem.key))
                                    props.setSelectedFolderFolders(newSelectedFolders)
                                    let newDrive = main_functions.deleteFolderFromTree(drive,recievedItem.id || recievedItem.key)
                                    if(newDrive){
                                        drive = newDrive;
                                    }
                                    main_functions.insertNodeIntoTree(drive,folder.id || folder.key,newNode);
                                    props.setReelFolders(drive)
                                    props.setGedMenu(drive)
                                }else{
                                    console.log(moveRes.error)
                                }
                            }).catch(err => {console.log(err)})
                        }
                    }

                    if(recievedItem.typeF === "file" || recievedItem.type){
                        let drive = props.reelFolders;
                        let newNode = main_functions.getFileById((recievedItem.key || recievedItem.id),drive)
                        if(newNode){
                            props.setLoading(true)
                            SmartService.move(recievedItem.key || recievedItem.id, folder.id || folder.key,
                                localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( moveRes => {
                                if (moveRes.succes === true && moveRes.status === 200) {
                                    props.setLoading(false)
                                    main_functions.deleteFileFromTree(drive,recievedItem.key || recievedItem.id)
                                    main_functions.insertNodeIntoTree(drive,folder.id || folder.key,newNode);
                                    props.setReelFolders(drive)
                                    props.setGedMenu(drive)
                                    if(recievedItem.type){
                                        let newDocs = props.selectedFolderFiles.filter(x => x.id !== recievedItem.id)
                                        props.setSelectedFolderFiles(newDocs)
                                    }
                                }else{
                                    console.log(moveRes.error)
                                }
                            }).catch(err => {console.log(err)})
                        }
                    }
                    if(recievedItem.typeF === "folder"){
                        let drive = props.reelFolders;
                        let newNode = main_functions.getFolderById((recievedItem.key || recievedItem.id),drive)
                        if(newNode){
                            props.setLoading(true)
                            SmartService.move(recievedItem.key || recievedItem.id, folder.id || folder.key,
                                localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( moveRes => {
                                if (moveRes.succes === true && moveRes.status === 200) {
                                    props.setLoading(true)
                                    let newDrive = main_functions.deleteFolderFromTree(drive,recievedItem.key || recievedItem.id)
                                    if(newDrive){
                                        drive = newDrive;
                                    }
                                    main_functions.insertNodeIntoTree(drive,folder.id || folder.key,newNode);
                                    props.setReelFolders(drive)
                                    props.setGedMenu(drive)
                                } else {
                                    console.log(moveRes.error)
                                }
                            }).catch(err => {console.log(err)})

                        }
                    }

                }
            }else{
                console.log("Fodler to itself not permited")
            }

        }
        e.dataTransfer.clearData();
    }

    return(
        <div>
            <h5 style={{marginTop:20}}>Dossiers({props.items.length || 0})</h5>
            <div className={isContainerDragOver === true ? props.items.length === 0 ? "folders_container folders_container_drag_over folder_container_empty"  : "folders_container folders_container_drag_over" : "folders_container"}
                 onDragOver={(e) => {
                     e.preventDefault();e.stopPropagation();
                     if(e.dataTransfer.effectAllowed === "link"){
                         setIsContainerDragOver(true)
                     }
                 }}
                 onDragLeave={(e) => {
                     e.preventDefault();e.stopPropagation();
                     setIsContainerDragOver(false)
                 }}
                 onDrop={(e) => {onDrop_container(e)}}
            >
                {
                    props.items.map((folder,key) =>
                        <div key={key} className="folder_item_container"
                             draggable
                             onDragStart={(e) => {
                                 e.dataTransfer.setData("file", JSON.stringify(folder))
                                 e.dataTransfer.effectAllowed = "link"
                             }}
                             onDragOver={(e) => {
                                 e.preventDefault();e.stopPropagation();
                                 if(e.dataTransfer.effectAllowed === "move" || e.dataTransfer.effectAllowed === "link"){
                                     setDragOverItemKey(key);setIsDragOver(true)
                                 }
                             }}
                             onDragLeave={(e) => {
                                 e.preventDefault();e.stopPropagation();
                                 setDragOverItemKey("");setIsDragOver(false)
                             }}
                             onDrop={(e) => {onDrop_folder(e,folder)}}

                        >
                            <div className={isDragOver === true && dragOverItemKey === key ? "folder_item folder_item_drag_over" : "folder_item"} onDoubleClick={(e) => {
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