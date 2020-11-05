import React, {Component} from "react";
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Container} from 'reactstrap';

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../assets/images/logos/logoSmartDom.jpeg';
import logo from '../assets/images/logos/logoSmartDom.jpeg';
import profilePic from '../assets/images/users/default_avatar.jpg';


const Notifications = [
    {
        id: 1,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary'
    },
    {
        id: 2,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info'
    },
    {
        id: 3,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success'
    },
    {
        id: 4,
        text: 'Caleb Flakelar commented on Admin',
        subText: '2 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger'
    },
    {
        id: 5,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'primary'
    },
    {
        id: 6,
        text: 'New user registered.',
        subText: '5 min ago',
        icon: 'mdi mdi-account-plus',
        bgColor: 'info'
    },
    {
        id: 7,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'success'
    },
    {
        id: 8,
        text: 'Caleb Flakelar commented on Admin',
        subText: '2 days ago',
        icon: 'mdi mdi-comment-account-outline',
        bgColor: 'danger'
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


class Topbar2 extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <React.Fragment>
                <div className="navbar-custom">
                    <Container fluid style={{backgroundColor:"black"}}>
                        <ul className="list-unstyled topnav-menu float-right mb-0">

                            {/*<li className="dropdown notification-list">
                                <Link
                                    className={classNames('navbar-toggle', 'nav-link', {'open': this.props.isMenuOpened})}
                                    to="#" onClick={this.props.menuToggle}>
                                    <div className="lines">
                                    </div>
                                </Link>
                            </li>*/}

                            {/*<li className="d-none d-sm-block">
                                <form className="app-search">
                                    <div className="app-search-box">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Chercher..."/>
                                            <div className="input-group-append">
                                                <button className="btn" type="submit">
                                                    <i className="fe-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </li>*/}



                            {/*<li>
                                <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus}
                                                 username={localStorage.getItem('email')}/>
                            </li>*/}


                            {/*<li className="dropdown notification-list">
                                <button className="btn btn-link nav-link right-bar-toggle waves-effect waves-light"
                                        onClick={this.props.rightSidebarToggle}>
                                    <i className="fe-settings noti-icon"></i>
                                </button>
                            </li>*/}
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


                    <div className="row float-right  mt-3" >
                        <div className="col-lg col-md">

                            <button type="button" className=" btn btn-danger btn-block">Une question?</button>
                        </div>


                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default Topbar2;

