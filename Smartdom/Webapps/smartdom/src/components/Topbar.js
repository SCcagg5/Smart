import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Container} from 'reactstrap';


import logoSm from '../assets/images/logos/logoSmartDom.jpeg';
import logo from '../assets/images/logos/logoSmartDom.jpeg';




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


export default Topbar;

