import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'reactstrap';


class Navbar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {activeItem} = this.props;
        return (
            <React.Fragment>
                <div className="topbar-menu">
                    <div>

                            <React.Fragment>
                                <ul className="navigation-menu   ">
                                    <li className={activeItem === "item-cf-user" ? "has-submenu active" :"has-submenu"}>
                                        <Link  aria-expanded="true">
                                            <i className="fe-airplay"></i>
                                            Dashboard
                                            <div className="ml-1 arrow-down">Dashboard</div>
                                        </Link>

                                        <ul className="submenu">
                                            <li>
                                                <Link to={'/user/coffre-fort'} className="side-nav-link-ref">Mon coffre fort</Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="has-submenu">
                                        <Link to="/crm"  >
                                            <i className="fe-cpu"></i>
                                            CRM
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>

                                    <li className="has-submenu">
                                        <Link >
                                            <i className="fe-command"></i>
                                            Accueil
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>

                                    <li className="has-submenu">
                                        <Link to="/courrier"  >
                                            <i className="fe-briefcase"></i>
                                            courrier
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>
                                    <li className="has-submenu">
                                        <Link >
                                            <i className="fe-cpu"></i>
                                            Phone
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>
                                    <li className="has-submenu">
                                        <Link to="/salles" >
                                            <i className="fe-layers"></i>
                                            Salles
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>

                                    <li className="has-submenu">
                                        <Link >
                                            <i className="fe-package"></i>
                                            GED
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>

                                    <li className="has-submenu">
                                        <Link >
                                            <i className="fe-sidebar"></i>
                                            Profil
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>


                                </ul>
                            </React.Fragment>
                            <div className="clearfix"></div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Navbar);
