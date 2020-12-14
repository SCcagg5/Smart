import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeView from "@material-ui/lab/TreeView";

const modules = process.env.REACT_APP_ACTIVE_MODULES;
const active_modules = (modules || "").split("/")

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
    }
}));


function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {labelText, labelIcon: LabelIcon, labelInfo, color, bgColor} = props;

    return (
        <div>
            <TreeItem
                onLabelClick={event => event.preventDefault()}
                onIconClick={event => event.preventDefault()}
                nodeId={props.nodeId}
                aria-controls={props.nodeId}
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
                onClick={() => props.onClick(props.nodeId)}
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
};


export default function MarketplacemenuItems(props) {
    const classes = useStyles();
    return(
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
            defaultEndIcon={<div style={{width: 32}}/>}
            selected={props.selectedMarketplaceItem}
            onNodeSelect={props.handleSelectMarketplaceMenu}
        >
            {
                props.items.map((item,key) =>
                    (item.nodeId === "recettes" && active_modules.includes("MARKETPLACE_EDITEUR_RECETTE") === false )  ||
                    (item.nodeId === "RH_Support_ponctuel" && active_modules.includes("MARKETPLACE_RH_SP") === false )  ?
                        null :
                    <StyledTreeItem key={key} nodeId={item.nodeId} labelText={item.title}
                                    labelIcon={item.icon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                    onClick={(nodeId) => props.onClick(nodeId)}
                    />
                )
            }

        </TreeView>



    )

}