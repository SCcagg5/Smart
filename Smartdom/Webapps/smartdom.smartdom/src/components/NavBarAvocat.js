import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'reactstrap';


class NavBarAvocat extends Component {
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
                                    <li className={activeItem === "item-infos" ? "has-submenu active": "has-submenu"}>
                                        <Link to={'/avocat/infos'}  aria-expanded="true">
                                            <i className="fe-airplay"></i>
                                            Mes informations
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
                                    </li>

                                    <li className={activeItem === "item-agenda" ? "has-submenu active": "has-submenu"}>
                                        <Link to={'/avocat/agenda'}>
                                            <i className="fe-command"></i>
                                            Agenda
                                            <div className="ml-1 arrow-down"></div>
                                        </Link>
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

export default withRouter(NavBarAvocat);
