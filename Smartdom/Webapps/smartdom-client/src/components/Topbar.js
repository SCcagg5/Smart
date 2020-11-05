import React, {Component} from "react";
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Container} from 'reactstrap';

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../assets/images/logos/logoSmartDom.jpeg';
import logo from '../assets/images/logos/logoSmartDom.jpeg';
import profilePic from '../assets/images/users/user-1.jpg';


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

        };
    }


    render() {
        return (
            <React.Fragment>
                <div className="navbar-custom">
                    <Container fluid>
                        <ul className="list-unstyled topnav-menu float-right mb-0">

                            <li className="dropdown notification-list">
                                <Link className={classNames('navbar-toggle', 'nav-link', {'open': this.props.isMenuOpened})} to="#" onClick={this.props.menuToggle}>
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </li>

                            <li className="d-none d-sm-block">
                                <form className="app-search">
                                    <div className="app-search-box">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search..." />
                                            <div className="input-group-append">
                                                <button className="btn" type="submit">
                                                    <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </li>

                            <li>
                                <NotificationDropdown notifications={Notifications} />
                            </li>

                            <li>
                                <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus} username={'Geneva'} />
                            </li>


                            <li className="dropdown notification-list">
                                <button className="btn btn-link nav-link right-bar-toggle waves-effect waves-light" onClick={this.props.rightSidebarToggle}>
                                    <i className="fe-settings noti-icon"></i>
                                </button>
                            </li>
                        </ul>

                        <div className="logo-box">
                            <Link to="/" className="logo text-center">
                <span className="logo-lg">
                  <img src={logo} alt="" height="40" />
                </span>
                                <span className="logo-sm">
                  <img src={logoSm} alt="" height="40" />
                </span>
                            </Link>
                        </div>


                    </Container>
                </div>
            </React.Fragment >
        );
    }
}


export default Topbar;

