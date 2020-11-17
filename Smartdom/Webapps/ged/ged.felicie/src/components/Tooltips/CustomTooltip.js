import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(10),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

export default function CustomTooltip(props) {

    return(

        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography variant="subtitle1"  color="inherit">{props.title}</Typography>
                    <b>{props.email}</b>
                </React.Fragment>
            }
        >
            {props.children}
        </HtmlTooltip>

    )

}