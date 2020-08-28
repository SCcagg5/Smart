import React from "react";
import '../assets/css/antDesign.css';
import { Tree } from 'antd';
import FolderIcon from '@material-ui/icons/Folder';
import SmartService from "../provider/SmartService";

const { DirectoryTree } = Tree;

export default class Test extends React.Component {

    componentDidMount() {
        SmartService.getGed(localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(gedRes => {

            if (gedRes.succes === true && gedRes.status === 200) {
                console.log(gedRes.data.Proprietary.Content.folders)
                this.setState({gData:this.changeStructure(gedRes.data.Proprietary.Content.folders)})
                this.setState({
                    folders: gedRes.data.Proprietary.Content.folders || [],
                })
            } else {

            }
        })
    }

    state={
        gData:[]
    }

    onDragEnter = info => {
        console.log(info);
    };
    onDrop = info => {
        //console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };
        const data = [...this.state.gData];

        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }

        this.setState({
            gData: data,
        });
    };

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    changeStructure = (drive) => {
        const list = [];
        for (let i = 0; i < drive.length; i++) {
            const key = drive[i].id.toString()
            const treeNode = {
                title: drive[i].name,
                key,
                icon: ({ selected }) => (selected ? <FolderIcon style={{color:"#1a73e8"}} /> : <FolderIcon style={{color:"grey"}} />),
            };

            if (drive[i].Content.folders.length > 0) {
                treeNode.children = this.changeStructure(drive[i].Content.folders);
            }

            list.push(treeNode);
        }
        return list;
    }


    render() {
        return (
            <div style={{marginTop:300,marginLeft:200,width:240}}>
                <DirectoryTree
                    draggable
                    showIcon={true}
                    defaultExpandedKeys={['0-0-0']}
                    onSelect={this.onSelect}
                    onDragEnter={this.onDragEnter}
                    onDrop={this.onDrop}
                    treeData={this.state.gData}
                    expandAction="click"
                    onRightClick={ info => {
                        console.log(info)
                    }}
                />
            </div>
        );
    }
}