import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/AddOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
    endIcon: {
        fontSize:14,
        marginRight: theme.spacing(1),
        '&:hover': {
            color:"#000",
            fontSize:18
        },
    }
}));


function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {labelText, labelIcon: LabelIcon, labelInfo,endIcon:EndIcon, color, bgColor,onEndIconClick, ...other} = props;

    return (
        <div>
            <TreeItem
                aria-controls="simple-menu"
                onClick={props.onClick}
                label={
                    <div className={classes.labelRoot}>
                        <LabelIcon color="inherit" className={classes.labelIcon}/>
                        <Typography variant="body2" className={classes.labelText}>
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                        {
                            onEndIconClick &&
                            <EndIcon color="inherit" className={classes.endIcon} onClick={onEndIconClick && props.onEndIconClick} />
                        }

                    </div>
                }
                style={{
                    '--tree-view-color': color,
                    '--tree-view-bg-color': bgColor,
                }}
                classes={{
                    root: classes.root,
                    content: classes.content,
                    expanded: classes.expanded,
                    selected: classes.selected,
                    group: classes.group,
                    label: classes.label,
                }}
                {...other}
            />
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 400,
    },
});

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    onEndIconClick : PropTypes.func
};

export default function GmailTree(props) {
    const classes = useStyles();

    const renderTree = (nodes) => (
        <StyledTreeItem nodeId={nodes.id} labelText={nodes.name} key={nodes.id}
                        labelIcon={FolderIcon}
                        endIcon={AddIcon}
                        onClick={() => {
                            props.setSelectedFolder(nodes)
                            props.getFolderName(nodes.name)
                            props.getFolderId(nodes.id)

                            if(nodes.Content && nodes.Content.files.length > 0){
                                props.getSelectedFolderFiles(nodes.Content.files)
                            }
                            else props.getSelectedFolderFiles([])

                        }}
                        onEndIconClick={props.onEndIconClick}
                        color="#1a73e8"
                        bgColor="#e8f0fe">
            {Array.isArray(nodes.Content.folders) ? (nodes.Content.folders || []).map((node) => renderTree(node)) : null}
        </StyledTreeItem>
    );
    const renderSharedTree = (nodes) => (
        <StyledTreeItem nodeId={nodes.id} labelText={nodes.name} key={nodes.id}
                        labelIcon={FolderIcon}
                        onClick={() => {
                            props.getFolderName(nodes.name)
                            props.getFolderId(nodes.id)

                            if(nodes.Content && nodes.Content.files.length > 0){
                                props.getSelectedFolderFiles(nodes.Content.files)
                            }
                            else props.getSelectedFolderFiles([])

                        }}
                        color="#e3742f"
                        bgColor="#fcefe3"
        >
            {nodes.Content && Array.isArray(nodes.Content.folders) ? (nodes.Content.folders || []).map((node) => renderSharedTree(node)) : null}
        </StyledTreeItem>
    );

    return (
        props.data.length > 0 &&
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
            defaultEndIcon={<div style={{width: 32}}/>}
            selected={props.selectedDriveItem}
            expanded={props.expandedDriveItems}
            onNodeToggle={props.handleToggle}
        >
            {
                props.data.map((folder,key) =>
                    renderTree(folder)
                )

            }
            <StyledTreeItem nodeId={"shared"} labelText={"Partagés avec moi"}
                            labelIcon={PersonAddIcon}
                            onClick={() => {
                                props.onClickSharedRootItem();
                                if(props.sharedRootFiles.length > 0 ){
                                    console.log(props.sharedRootFiles)
                                    props.getSelectedFolderFiles(props.sharedRootFiles)
                                }
                            }}
                            color="#e3742f"
                            bgColor="#fcefe3"
            >
                {
                    props.sharedDrive.map((folder,key) =>
                        renderSharedTree(folder)
                    )
                }

            </StyledTreeItem>
        </TreeView>
    );

}