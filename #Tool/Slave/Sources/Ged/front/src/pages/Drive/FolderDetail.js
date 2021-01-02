import React from "react";
import ListFolders from "../../components/List/ListFolders";
import ListDocs from "../../components/List/ListDocs";


export default function FolderDetail(props){


    return(
        <div style={{marginTop: 15}}>
            <ListFolders
                reelFolders={props.reelFolders}
                setReelFolders={props.setReelFolders}
                setGedMenu={props.setGedMenu}
                selectedFolderFiles={props.selectedFolderFiles}
                setSelectedFolderFiles={props.setSelectedFolderFiles}
                selectedFolderFolders={props.selectedFolderFolders}
                setSelectedFolderFolders={props.setSelectedFolderFolders}
                selectedFolderId={props.selectedFolderId}
                pathname={props.pathname}
                rootFiles={props.rootFiles}
                setRootFiles={props.setRootFiles}
                items={props.selectedFolderFolders || []}
                onDoubleClickFolder={(folder) => {
                    props.onDoubleClickFolder(folder)
                }}
                setLoading={(b) => props.setLoading(b)}
            />
            <ListDocs
                reelFolders={props.reelFolders}
                docs={props.selectedFolderFiles || []}
                selectedFolderFiles={props.selectedFolderFiles}
                setSelectedFolderFiles={props.setSelectedFolderFiles}
                selectedFolderId={props.selectedFolderId}
                setReelFolders={props.setReelFolders}
                setGedMenu={props.setGedMenu}
                pathname={props.pathname}
                viewMode={props.viewMode}
                onDocClick={(item) => {
                    props.onDocClick(item)
                }}
                showDoc={(doc) => props.showDoc(doc)}
                setLoading={(b) => props.setLoading(b)}
                setSelectedFile={(file) => props.setSelectedFile(file)}
                openShareFileModal={() => props.openShareFileModal()}
                onDeleteFile={(file) => {
                    props.onDeleteFile(file)
                }}
                onRenameFile={(file, newName) => {
                    props.onRenameFile(file,newName)
                }}
                onSignBtnClick={(id) => {
                    props.onSignBtnClick(id)
                }}
                onDropFile={(node) => props.onDropFile(node)}
                setDocs={(docs) => props.setDocs(docs)}
                onDeleteFiles={(files) => props.onDeleteFiles(files)}
                applyRights={props.applyRights}
                selectedSharedFolder={props.selectedSharedFolder}
            />
        </div>
    )


}