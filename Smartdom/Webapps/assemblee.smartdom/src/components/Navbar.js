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
                    <div className="container-fluid">
                        <Collapse isOpen={this.props.isMenuOpened} id="navigation">
                            <React.Fragment>
                                <ul className="navigation-menu in">
                                    <li className="has-submenu">
                                        <Link  aria-expanded="true">
                                            <i className="fe-airplay"></i>
                                            Tableau de bord
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>

                                    <li className="has-submenu">
                                        <Link >
                                            <i className="fe-command"></i>
                                            Registre et compte d'actionnaires
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>
                                    <li className={activeItem === "item-avocats" ? "has-submenu active": "has-submenu"}>
                                        <Link to={'/avocats'}  aria-expanded="true">
                                            <i className="fe-users"></i>
                                            Avocats
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>
                                    <li
                                        className={activeItem === "item-cf" ? "has-submenu active": "has-submenu"}>
                                        <Link to={'/coffre-fort'} aria-expanded="true">
                                            <i className="fe-folder-plus"></i>
                                            Coffre-fort de documents
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li >
                                    <li
                                        className={activeItem === "item-gestion" ? "has-submenu active": "has-submenu"}>
                                        <Link  aria-expanded="true" >
                                            <i className="fe-settings"></i>
                                            Gestion
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                        <ul className="submenu">
                                            <li>
                                                <Link to={'/gestion/entreprises'} className="side-nav-link-ref">Mes entreprises</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </React.Fragment>
                            <div className="clearfix"></div>
                        </Collapse>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Navbar);
