import React, {Component} from 'react';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
        color: "secondary",
        "&$selected": {
            color: "green"
        }
    },
    icon:{
        marginBottom:"unset"
    },
    customBadge: {
        backgroundColor: "#00AFD7",
        color: "white"
    }
});


export default function BottomBar(props) {

    const classes = useStyles();
    const [currentTab, setCurrentTab] = React.useState(props.selectedPage);

        return (
            <div style={{position:"fixed",bottom:0,width:"100%"}}>
            <BottomNavigation
                value={currentTab}
                onChange={(event, newValue) => {
                    setCurrentTab(newValue)
                    props.onNavigate(newValue)
                }}
                showLabels={true}
                className={classes}
            >
                <BottomNavigationAction label="Magasin" icon={<StoreIcon />} />
                {
                    props.phone !== null &&
                    [
                        <BottomNavigationAction label="Cart" icon={<Badge badgeContent={props.cart} color="secondary" classes={classes.customBadge} > <ShoppingCartIcon /></Badge>} />,
                        <BottomNavigationAction label="Compte" icon={<PermIdentityIcon/>}/>
                    ]
                }
                {
                    props.email !== null &&
                    <BottomNavigationAction label="Chat" icon={<ChatIcon/>}/>
                }
            </BottomNavigation>
            </div>


        );

}
