import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
}));


function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <TreeItem
                aria-controls="simple-menu"
                onClick={props.onClick}
                /*onContextMenu={event => {
                    event.preventDefault()
                    handleClick(event)
                    //props.onContextMenu(event)
                }}*/
                label={
                    <div className={classes.labelRoot}>
                        <LabelIcon color="inherit" className={classes.labelIcon}/>
                        <Typography variant="body2" className={classes.labelText}>
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
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
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>

    );
}

const useStyles = makeStyles({
    root: {
        height: 264,
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
};

function SubFolder(props) {
    return (
        props.items.map((item, key) =>
            <StyledTreeItem key={key}
                            nodeId={item.id}
                            labelText={item.name}
                            labelIcon={FolderIcon}
                //labelInfo={item.Content.folders.length || "0"}
                            color="#1a73e8"
                            bgColor="#e8f0fe"
                            onClick={() => {
                                props.getFolderName(item.name)
                                props.getFolderId(item.id)
                                if(item.Content.files.length > 0){
                                    //console.log(item.Content.files)
                                    props.getSelectedFolderFiles(item.Content.files)
                                }
                                else props.getSelectedFolderFiles([])
                            }}
                            //onContextMenu={(event) => props.onContextMenu(event)}
            >
                {
                    item.Content.folders.length > 0 &&
                    <SubFolder items={item.Content.folders}/>
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
        >
            {
                (props.data || []).map((item, key) =>
                    <StyledTreeItem key={key} nodeId={item.id} labelText={item.name}
                                    labelIcon={FolderIcon} //labelInfo={item.Content.folders.length || "0"}
                                    onClick={() => {
                                        props.getFolderName(item.name)
                                        props.getFolderId(item.id)

                                        if(item.Content.files.length > 0){
                                            //console.log(item.Content.files)
                                            props.getSelectedFolderFiles(item.Content.files)
                                        }
                                        else props.getSelectedFolderFiles([])

                                    }}
                                    //onContextMenu={(event) => props.onContextMenu(event)}
                    >
                        {
                            item.Content.folders.length > 0 &&
                            <SubFolder items={item.Content.folders} getFolderName={(name) => props.getFolderName(name)}
                                       getFolderId={(id) => props.getFolderId(id)}
                                       getSelectedFolderFiles={(files) => props.getSelectedFolderFiles(files)} />
                        }

                    </StyledTreeItem>
                )
            }
        </TreeView>
    );

}