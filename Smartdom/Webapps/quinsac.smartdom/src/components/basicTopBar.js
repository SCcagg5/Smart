import React, {Component} from "react";

import {Container} from 'reactstrap';
import {Link} from "react-router-dom";
import logo from "../assets/images/logos/logoSmartCo.jpeg";
import logoSm from '../assets/images/logos/logoSmartCo.jpeg';

class basicTopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
                <div className="navbar-custom">
                    <Container fluid>

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


export default basicTopBar;

