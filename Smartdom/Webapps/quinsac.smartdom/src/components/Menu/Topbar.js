import React, {Component} from "react";
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {Container} from 'reactstrap';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../../assets/images/vin/logo.png';
import logo from '../../assets/images/vin/logo.png';
import profilePic from '../../assets/images/users/default_avatar.jpg';
import firebase from "firebase/app";
import "firebase/database"

const ProfileMenus = [
    {
        label: 'Mon compte',
        icon: 'fe-user',
        redirectTo: "/",
    },
    {
        label: 'Mes projets',
        icon: 'fe-settings',
        redirectTo: "/admin/projects"
    },
    {
        label: 'Déconnexion',
        icon: 'fe-log-out',
        redirectTo: "/logout",
        hasDivider: true
    }];

const InvestisorProfileMenus = [
    {
        label: 'Mon espace personnel',
        icon: 'fe-user',
        redirectTo: "/investisor/dashboard",
    },
    {
        label: 'Déconnexion',
        icon: 'fe-log-out',
        redirectTo: "/logout",
        hasDivider: true
    }];

const InvestisorProfileNotCompletedMenus = [
    {
        label: 'Completer mon profil',
        icon: 'fe-user',
        redirectTo: "/signup/investisor/step1",
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
            profilPic:"",
            step:""
        };
    }

    componentWillMount() {
        if(localStorage.getItem("uid") !== undefined && localStorage.getItem("uid") !== null){
            firebase.database().ref('/users/'+localStorage.getItem("uid")).on('value', (snapshot) => {
                let user = snapshot.val();
                this.setState({
                    profilPic:user.profilImage || "",
                    step:user.step1
                })
            })
        }
    }


    render() {
        const {props} = this.props;
        return (
            <React.Fragment>
                <div className="navbar-custom gradient-topbar">
                    <Container fluid>


                        <ul className="list-unstyled topnav-menu float-right mb-0 fe-">


                            <li className="dropdown notification-list">
                                <Link
                                    className={classNames('navbar-toggle', 'nav-link', {'open': this.props.isMenuOpened})}
                                    to="#" onClick={this.props.menuToggle}>
                                    <div className="lines">
                                    </div>
                                </Link>
                            </li>


                            <li>
                                {
                                    localStorage.getItem("uid") !== undefined && localStorage.getItem("uid") !== null && props.location.pathname !== "/login" &&
                                    props.location.pathname !== "/signup/investisor"?
                                        <ProfileDropdown profilePic={this.state.profilPic === "" ? profilePic : this.state.profilPic }
                                                         menuItems={localStorage.getItem("role") === "investisor" ? this.state.step ==="ok" ?
                                                             InvestisorProfileMenus : InvestisorProfileNotCompletedMenus : ProfileMenus}
                                                         username={localStorage.getItem('email')}/> :
                                        <button type="button" onClick={() => props.history.push("/login")}
                                                className="btn btn-outline-info btn-rounded waves-effect waves-light font-weight-bolder">Se
                                            connecter / S'inscrire
                                        </button>
                                }

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
                            {
                                localStorage.getItem("role") === undefined || localStorage.getItem("role") === null || localStorage.getItem("role") === "investisor" ?
                                    <li className="dropdown d-none d-lg-block">
                                        <a className="nav-link dropdown-toggle waves-effect"
                                           style={{borderBottom:"4px solid #19b4fa"}}
                                           onClick={() => props.history.push("/comment-investir")}
                                           role="button" aria-haspopup="false" aria-expanded="false">
                                            <h6 className="text-dark font-weight-bolder hoverColor"
                                                style={{fontSize: ".88889rem"}}>Comment investir</h6>

                                        </a>
                                    </li> :
                                    <li className="dropdown d-none d-lg-block">
                                        <a className="nav-link dropdown-toggle waves-effect"
                                           style={{borderBottom:"4px solid #19b4fa"}}
                                           onClick={() => props.history.push("/admin/newProject")}
                                           role="button" aria-haspopup="false" aria-expanded="false">
                                            <h6 className="text-dark font-weight-bolder hoverColor"
                                                style={{fontSize: ".88889rem"}}>Nouveau projet</h6>

                                        </a>
                                    </li>
                            }
                            <li className="dropdown d-none d-lg-block" style={{marginLeft:25}}>
                                <a className="nav-link dropdown-toggle waves-effect"
                                   style={{borderBottom:"4px solid #19b4fa"}}
                                   onClick={() => props.history.push("/comment-emprunter")}
                                   role="button" aria-haspopup="false" aria-expanded="false">
                                    <h6 className="text-dark font-weight-bolder hoverColor"
                                        style={{fontSize: ".88889rem"}}>Comment emprunter</h6>
                                </a>
                            </li>
                            <li className="dropdown d-none d-lg-block" style={{marginLeft:25}}>
                                <a className="nav-link dropdown-toggle waves-effect"
                                   style={{borderBottom:"4px solid #19b4fa"}}
                                   onClick={() => props.history.push("/projects")}
                                   role="button" aria-haspopup="false" aria-expanded="false">
                                    <h6 className="text-dark font-weight-bolder hoverColor"
                                        style={{fontSize: ".88889rem"}}>Découvrez les projets</h6>
                                </a>
                            </li>

                        </ul>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}


export default Topbar;
