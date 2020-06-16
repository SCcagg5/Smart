import React, {Component} from "react";
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Container} from 'reactstrap';
import ReactCountryFlag from "react-country-flag"

import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import logoSm from '../assets/images/beautysane_LOGO_vert.png';
import logo from '../assets/images/beautysane_LOGO_vert.png';
import profilePic from '../assets/images/users/default_avatar.jpg';
import oa from "../assets/images/OA.png";


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


class TopbarRecettes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: '',
            region: ''

        };
    }

    selectCountry (val) {
        this.setState({ country: val });
    }

    selectRegion (val) {
        this.setState({ region: val });
    }
    render() {
        const { country, region } = this.state;

        return (
            <React.Fragment>
                <div className="navbar-custom ">
                    <Container fluid className="h-100 " >

                        <div className="row  align-items-center justify-content-end">
                            <div className="col-md-auto mr-3" >

                                <div className="row align-items-center">



                                    <i className="fas fa-phone  align-items-center"></i>

                                    <h5 className="ml-1">Nous contacter</h5>

                                </div>




                            </div>
                            <div className="col-md-1" >

                                <div className="row align-items-center">



                                    <i className=" fas fa-user align-items-center"></i>

                                    <h5 className="ml-1">Mon compte</h5>

                                </div>




                            </div>
                            <div className="col-md-1" >

                               <div className="row align-items-center">



                                <i className=" fas  fa-question-circle align-items-center"></i>

                                <h5 className="ml-1">FAQ</h5>

                               </div>




                            </div>

                           <div className="col-md-auto">


                            <ReactCountryFlag
                                countryCode="FR"
                                svg
                                style={{
                                    width: '2em',
                                    height: '2em',
                                }}
                                title="US"
                            />

                            <ReactCountryFlag
                                className="emojiFlag"
                                countryCode="FR"
                                style={{
                                    marginLeft:2,
                                    fontSize: 20 ,
                                    color:"black"

                                }}
                                aria-label="United States"
                            />
                           </div>




                        </div>





                        {/*

                        */}



                    </Container>



                </div>
            </React.Fragment>
        );
    }
}


export default TopbarRecettes;

