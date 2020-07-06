import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'reactstrap';


class Navbar extends Component {

    render() {
        const {activeItem} = this.props;
        return (
            <React.Fragment>
                <div className="topbar-menu">
                    <div className="container-fluid">
                        <Collapse isOpen={this.props.isMenuOpened} id="navigation">
                            <React.Fragment>
                                <ul className="navigation-menu in" style={{height:70}}>
                                    <li className={activeItem === "item-cf-user" ? "has-submenu active" :"has-submenu"}>
                                        <Link  aria-expanded="true" to={"/gestion/entreprises"}>
                                            <i className="fe-airplay"/>
                                            Tableau de bord
                                            <div className="ml-1 arrow-down"/>
                                        </Link>
                                        <ul className="submenu">
                                            <li>
                                                <Link to={'/user/coffre-fort'} className="side-nav-link-ref">Mon coffre fort</Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="has-submenu">
                                        <Link to={"/gestion/entreprises"}>
                                            <i className="fe-command"/>
                                            Registre et compte d'actionnaires
                                            <div className="ml-1 arrow-down"/>
                                        </Link>
                                    </li>
                                    <li className={activeItem === "item-avocats" ? "has-submenu active": "has-submenu"}>
                                        <Link to={'/avocats'}  aria-expanded="true">
                                            <i className="fe-users"/>
                                            Avocats
                                            <div className="ml-1 arrow-down"/>
                                        </Link>
                                    </li>
                                    <li
                                        className={activeItem === "item-cf" ? "has-submenu active": "has-submenu"}>
                                        <Link to={'/coffre-fort'} aria-expanded="true">
                                            <i className="fe-folder-plus"/>
                                            Coffre-fort de documents
                                            <div className="ml-1 arrow-down"/>
                                        </Link>
                                    </li >
                                    <li
                                        className={activeItem === "item-gestion" ? "has-submenu active": "has-submenu"}>
                                        <Link  aria-expanded="true" to={"/gestion/entreprises"}  >
                                            <i className="fe-settings"/>
                                            Gestion
                                            <div className="ml-1 arrow-down"/>
                                        </Link>
                                        <ul className="submenu">
                                            <li>
                                                <Link to={'/gestion/entreprises'} className="side-nav-link-ref">Mes entreprises</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </React.Fragment>
                            <div className="clearfix"/>
                        </Collapse>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Navbar);
