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
import PersonAddIcon from "@material-ui/icons/PersonAdd"

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
        //color:"transparent",
        '&:hover': {
            color:"#000",
            fontSize:18
        },
    }
}));


function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {labelText, labelIcon: LabelIcon, labelInfo,endIcon:EndIcon, color, bgColor, ...other} = props;

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
                            props.endIcon && props.endIcon !== "" &&
                            <EndIcon color="inherit" className={classes.endIcon} onClick={ event => props.onEndIconClick(event)} />
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
        //height: 264,
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
    onEndIconClick: PropTypes.func
};

function SubFolder(props) {
    return (
        props.items.map((item, key) =>
            <StyledTreeItem key={key}
                            nodeId={item.id}
                            labelText={item.name}
                            labelIcon={FolderIcon}
                            endIcon={props.showEndIcon === true ? AddIcon : ""}
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={() => {
                                props.getFolderName(item.name)
                                props.getFolderId(item.id)
                                if(item.Content && item.Content.files.length > 0){
                                    //console.log(item.Content.files)
                                    props.getSelectedFolderFiles(item.Content.files)
                                }
                                else props.getSelectedFolderFiles([])
                            }}
                            onEndIconClick={props.onEndIconClick}
            >
                {
                    item.Content && item.Content.folders.length > 0 &&
                    <SubFolder items={item.Content.folders} getFolderName={(name) => props.getFolderName(name)}
                               getFolderId={(id) => props.getFolderId(id)} onEndIconClick={props.onEndIconClick}
                               getSelectedFolderFiles={(files) => props.getSelectedFolderFiles(files)}
                               showEndIcon={props.showEndIcon === true}
                    />
                }
            </StyledTreeItem>
        )


    )
}

export default function GmailCloneTree(props) {
    const classes = useStyles();
    return (
        <TreeView
            className={classes.root}
            //defaultExpanded={['3']}
            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
            defaultEndIcon={<div style={{width: 32}}/>}
            selected={props.selectedDriveItem}
        >
            {
                (props.data || []).map((item, key) =>
                    <div key={key}>
                        <StyledTreeItem  nodeId={item.id} labelText={item.name}
                                        labelIcon={FolderIcon}
                                        endIcon={AddIcon}
                                        onClick={() => {
                                            props.getFolderName(item.name)
                                            props.getFolderId(item.id)

                                            if(item.Content && item.Content.files.length > 0){
                                                props.getSelectedFolderFiles(item.Content.files)
                                            }
                                            else props.getSelectedFolderFiles([])

                                        }}
                                        onEndIconClick={props.onEndIconClick}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                        >
                            {/*{
                                item.Content.folders.length > 0 &&
                                <SubFolder items={item.Content.folders} getFolderName={(name) => props.getFolderName(name)}
                                           getFolderId={(id) => props.getFolderId(id)} onEndIconClick={props.onEndIconClick}
                                           getSelectedFolderFiles={(files) => props.getSelectedFolderFiles(files)}
                                           showEndIcon={true}
                                />
                            }*/}

                        </StyledTreeItem>
                    </div>

                )
            }
            {/*<StyledTreeItem  nodeId={"00002"} labelText={"Partagés avec moi"}
                             labelIcon={PersonAddIcon} //labelInfo={item.Content.folders.length || "0"}
                             onClick={() => {
                                 if(props.sharedDrive.length === 0 ){
                                     props.getFolderName("Partagés avec moi")
                                     props.getSelectedFolderFiles([])
                                 }
                             }}
                             color="#1a73e8"
                             bgColor="#e8f0fe"
            >
                {
                    (props.sharedDrive || []).map((item, key) =>
                        <div key={key}>
                            <StyledTreeItem  nodeId={item.id} labelText={item.name}
                                             labelIcon={FolderIcon}
                                              //labelInfo={item.Content.folders.length || "0"}
                                             //endIcon={AddIcon}
                                             onClick={() => {
                                                 props.getFolderName(item.name)
                                                 props.getFolderId(item.id)

                                                 if(item.Content.files.length > 0){
                                                     //console.log(item.Content.files)
                                                     props.getSelectedFolderFiles(item.Content.files)
                                                 }
                                                 else props.getSelectedFolderFiles([])

                                             }}
                                             onEndIconClick={props.onEndIconClick}
                                             color="#1a73e8"
                                             bgColor="#e8f0fe"
                            >
                                {
                                    item.Content && item.Content.folders.length > 0 &&
                                    <SubFolder items={item.Content.folders} getFolderName={(name) => props.getFolderName(name)}
                                               getFolderId={(id) => props.getFolderId(id)} onEndIconClick={props.onEndIconClick}
                                               getSelectedFolderFiles={(files) => props.getSelectedFolderFiles(files)}
                                               showEndIcon={false}
                                    />
                                }

                            </StyledTreeItem>
                        </div>

                    )
                }
            </StyledTreeItem>*/}
        </TreeView>
    );

}