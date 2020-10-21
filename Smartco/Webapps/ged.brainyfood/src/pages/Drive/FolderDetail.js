import React from "react";
import ListFolders from "../../components/List/ListFolders";
import ListDocs from "../../components/List/ListDocs";


export default class FolderDetail extends React.Component{

    constructor(props) {
        super(props);
    }
    state={

    }


    render() {
        return(
            <div style={{marginTop: 15}}>
                <ListFolders
                    items={this.props.selectedFolderFolders || []}
                    onDoubleClickFolder={(folder) => {
                        this.props.onDoubleClickFolder(folder)
                    }}
                />
                <ListDocs
                    docs={this.props.selectedFolderFiles || []}
                    viewMode={this.props.viewMode}
                    onDocClick={(item) => {
                        this.props.onDocClick(item)
                    }}
                    showDoc={(doc) => this.props.showDoc(doc)}
                    setLoading={(b) => this.props.setLoading(b)}
                    setSelectedFile={(file) => this.props.setSelectedFile(file)}
                    openShareFileModal={() => this.props.openShareFileModal()}
                    onDeleteFile={(file) => {
                        this.props.onDeleteFile(file)
                    }}
                    onRenameFile={(file, newName) => {
                        this.props.onRenameFile(file,newName)
                    }}
                    onSignBtnClick={(id) => {
                        this.props.onSignBtnClick(id)
                    }}
                    onDropFile={(node) => this.props.onDropFile(node)}
                    setDocs={(docs) => this.props.setDocs(docs)}
                    onDeleteFiles={(files) => this.props.onDeleteFiles(files)}
                />
            </div>
        )
    }
}