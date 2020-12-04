import React, {Component} from "react";
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {Container} from 'reactstrap';

import ProfileDropdown from './ProfileDropdown';
import logoSm from '../../assets/images/logo-leperray.png';
import logo from '../../assets/images/logo-leperray.png';
import profilePic from '../../assets/images/users/default_avatar.jpg';



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


class TopBarUser extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
                <div className="navbar-custom gradient-topbar">
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

                        <ul className="list-unstyled topnav-menu topnav-menu-left">
                            <li className="dropdown d-none d-lg-block">
                                <a className="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="#"
                                   role="button" aria-haspopup="false" aria-expanded="false">
                                    <h6 className="text-dark font-weight-bolder hoverColor" style={{fontSize:".88889rem"}}>Comment investir</h6>

                                </a>
                            </li>
                            <li className="dropdown d-none d-lg-block">
                                <a className="nav-link dropdown-toggle waves-effect" data-toggle="dropdown" href="#"
                                   role="button" aria-haspopup="false" aria-expanded="false">
                                    <h6 className="text-dark font-weight-bolder hoverColor" style={{fontSize:".88889rem"}}>Découvrez les projets</h6>
                                </a>
                            </li>
                        </ul>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}


export default TopBarUser;

