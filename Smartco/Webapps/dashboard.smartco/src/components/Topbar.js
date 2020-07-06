import React, {Component} from "react";
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {Container} from 'reactstrap';

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../assets/images/logos/logoSmartCo.jpeg';
import logo from '../assets/images/logos/logoSmartCo.jpeg';
import profilePic from '../assets/images/users/default_avatar.jpg';

const Notifications = [
    {
        id: 1,
        text: 'Bonjour',
        subText: 'Bienvenue sur SmartCo !',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary'
    }];

const ProfileMenus = [
    {
        label: 'Mon compte',
        icon: 'fe-user',
        redirectTo: "/",
    },
    {
        label: 'Mes entreprises',
        icon: 'fe-zoom-in',
        redirectTo: "/gestion/entreprises"
    },
    {
        label: 'Mon coffre fort',
        icon: 'fe-zoom-in',
        redirectTo: "/user/coffre-fort"
    },
    {
        label: 'Paramètres',
        icon: 'fe-settings',
        redirectTo: "/"
    },
    {
        label: 'Déconnexion',
        icon: 'fe-log-out',
        redirectTo: "/logout",
        hasDivider: true
    }];


class Topbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textSearch:"",
            resultData:""
        };
    }


    render() {
        return (
            <React.Fragment>
                <div className="navbar-custom">
                    <Container fluid>
                        <ul className="list-unstyled topnav-menu float-right mb-0">

                            <li className="dropdown notification-list">
                                <Link
                                    className={classNames('navbar-toggle', 'nav-link', {'open': this.props.isMenuOpened})}
                                    to="#" onClick={this.props.menuToggle}>
                                    <div className="lines">
                                    </div>
                                </Link>
                            </li>

                            <li className="d-none d-sm-block">
                                <div className="app-search">
                                    <div className="app-search-box">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Chercher..."
                                                   style={{width:400,fontWeight:"bold"}} value={this.state.textSearch}
                                                   onChange={(event) => this.setState({textSearch:event.target.value})}/>
                                            <div className="input-group-append">
                                                <button className="btn" onClick={this.props.searchOCR ? this.props.searchOCR(this.state.textSearch) : () => {}}>
                                                    <i className="fe-search" style={{fontSize:17,fontWeight:"bold",color:"red"}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <NotificationDropdown notifications={Notifications}/>
                            </li>

                            <li>
                                <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus}
                                                 username={localStorage.getItem('email')}/>
                            </li>

                        </ul>

                        <div className="logo-box">
                            <Link to="/" className="logo text-center">
                               <span className="logo-lg">
                                   <img src={logo} alt="" height="40"/>
                               </span>
                                <span className="logo-sm">
                                   <img src={logoSm} alt="" height="40"/>
                                </span>
                            </Link>
                        </div>

                        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                            <li className="dropdown d-none d-lg-block">
                            </li>
                        </ul>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}


export default Topbar;

