import React, {Component} from 'react';
import "./style.css"
import logo from "../../assets/images/logos/la-casa-verde-logo.jpg"
class NavBarNlManager extends Component {
    constructor(props){
        super(props)
        this.state={
            nav:props.nav
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="topbar">
                    <nav className="topbar-main">
                        <div className="topbar-left">
                            <a href="/" className="logo">
                        <span>
                            <img src={logo} alt="logo-small" className="logo-sm"/>
                            <span className="text-black xs-hide">Espace manager</span>
                        </span>
                            </a>
                        </div>
                        <ul className="list-unstyled topbar-nav float-right mb-0">


                            <li>

                                <a className="nav-link arrow-none waves-light waves-effect" href="/shop/cart">
                                    <span id="cart_resume_menu"><span id="menu_shop_cart_total">0.00</span>€ <span
                                        id="menu_shop_cart_total_pv">0</span> PV</span>
                                    <i className="dripicons-cart noti-icon ml10"></i>
                                    <span className="badge badge-primary badge-pill noti-icon-badge"><span
                                        id="menu-cart-quantity">0</span></span>
                                </a>
                            </li>


                            <li className="dropdown">
                                <a className="nav-link dropdown-toggle waves-effect waves-light nav-user"
                                   data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                   aria-expanded="false">
                                    <span
                                        className="ml-1 nav-user-name hidden-sm">Mon compte <b>Jean hugues Lauret</b><i
                                        className="mdi mdi-chevron-down"></i> </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">

                                    <a className="dropdown-item" href="/team"><i
                                        className="dripicons-user text-muted mr-2"></i> L'équipe NL</a>

                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/settings/profile"><i
                                        className="dripicons dripicons-information text-muted mr-2"></i>Mes informations</a>
                                    <div className="dropdown-divider"></div>

                                    <a className="dropdown-item" href="/logout"><i
                                        className="dripicons-exit text-muted mr-2"></i> Déconnexion</a>
                                </div>
                            </li>
                            <li className="menu-item">
                                <a className="navbar-toggle nav-link" id="mobileToggle">
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </a>

                            </li>


                            <li className="dropdown">
                                <a href="#" className="nav-link dropwown-toggle waves-effect waves-light nav-user"
                                   data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                                    <img style={{display:'inline-block',width:'18px',height:'12px'}}
                                         src="/assets/images/flags/033.svg" alt="French flag"/>
                                        <i className="mdi mdi-chevron-down"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item change-language" href="#" data-lang="en">
                                        <img style={{display:'inline-block',width:'18px',height:'12px'}}
                                             src="/assets/images/flags/044.svg" alt="GB flag"/>
                                            English
                                    </a>
                                    <a className="dropdown-item change-language" href="#" data-lang="de">
                                        <img style={{display:'inline-block',width:'18px',height:'12px'}}
                                             src="/assets/images/flags/049.svg" alt="DE flag"/>
                                            Deutsch
                                    </a>
                                    <a className="dropdown-item change-language" href="#" data-lang="nl">
                                        <img style={{display:'inline-block',width:'18px',height:'12px'}}
                                             src="/assets/images/flags/031.svg" alt="NL flag"/>
                                            Nederlands
                                    </a>
                                    <a className="dropdown-item change-language" href="#" data-lang="ru">
                                        <img style={{display:'inline-block',width:'18px',height:'12px'}}
                                             src="/assets/images/flags/007.svg" alt="RU flag"/>
                                            Russia
                                    </a>
                                </div>

                            </li>


                        </ul>

                    </nav>
                    <div className="navbar-custom-menu">
                        <div className="container-fluid">
                            <div id="navigation" className="active">
                                <ul className="navigation-menu">


                                    <li className={this.props.nav==="accueil"?"has-submenu active":"has-submenu "}>
                                        <a href="/accueil">
                                            <i className="dripicons dripicons-meter"></i>
                                            <span>Accueil</span>
                                        </a>
                                        <ul className="submenu">
                                            <li className="nav-item active"><a className="nav-link" href="/dashboard"><i
                                                className="dripicons dripicons-meter"></i>Accueil</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/dashboard/news"><i
                                                className="dripicons dripicons-broadcast"></i>Actualités</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/newsletters"><i
                                                className="dripicons-mail dripicons"></i> Newsletters</a></li>
                                        </ul>
                                    </li>


                                    <li className={this.props.nav==="manager"?"has-submenu active":"has-submenu "}>
                                        <a href="#">
                                            <i className="dripicons dripicons-network-3"></i>
                                            <span>Manager</span>
                                        </a>
                                        <ul className="submenu">
                                            <li className="nav-item"><a className="nav-link" href="/manager/map"><i
                                                className="dripicons dripicons-graph-line"></i>Liste Manager </a></li>
                                            <li className="nav-item"><a className="nav-link" href="/network/stats"><i
                                                className="dripicons dripicons-graph-line"></i>Statistiques</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/network/tree"><i
                                                className="dripicons dripicons-network-3"></i>Affichage réseau</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/network/managers"><i
                                                className="dripicons dripicons-user-group"></i>Mes associés</a></li>
                                            <li className="nav-item"><a className="nav-link"
                                                                        href="/network/managers/recents"><i
                                                className="dripicons dripicons-tag"></i>Nouveaux associés</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/network/history"><i
                                                className="dripicons dripicons-view-list-large"></i>Historique</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/network/recos"><i
                                                className="dripicons dripicons-star"></i>Reconnaissances</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/network/renew"><i
                                                className="dripicons dripicons-checklist"></i>Renouvellement 2021</a>
                                            </li>
                                            <li className="nav-item"><a className="nav-link"
                                                                        href="/network/managers/boosters"><i
                                                className="dripicons dripicons-rocket"></i>Boosters</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/network/search"><i
                                                className="dripicons dripicons-search"></i>Rechercher</a></li>
                                            <li className="nav-item">
                                                <hr/>
                                            </li>
                                            <li className="nav-item"><a className="nav-link"
                                                                        href="/signup?managerId=172102"><i
                                                className="dripicons dripicons-plus"></i>Inscrire un <br/>nouveau manager</a>
                                            </li>

                                        </ul>
                                    </li>


                                    <li className={this.props.nav==="cqm"?"has-submenu active":"has-submenu "}>
                                        <a href="#">
                                            <i className="dripicons dripicons-user-group"></i>
                                            <span>CQM</span>
                                        </a>
                                        <ul className="submenu">
                                            <li className="nav-item"><a className="nav-link" href="/crm/clients"><i
                                                className="dripicons dripicons-user-group"></i>Mes clients</a></li>
                                            <li className="nav-item"><a className="nav-link" href="/crm/leads"><i
                                                className="dripicons dripicons-experiment"></i>Mes prospects</a></li>

                                            <li className="nav-item"><a className="nav-link" href="/cqm?tab=CQuizM"><i
                                                className="dripicons dripicons-experiment"></i>Quizz Manager </a></li>

                                            <li className="nav-item"><a className="nav-link" href="/crm/leads"><i
                                                className="dripicons dripicons-experiment"></i>Newsletter manager </a></li>



                                        </ul>
                                    </li>

                                    <li className={this.props.nav==="gestion"?"has-submenu active":"has-submenu "}>
                                        <a href="/gestion">
                                            <i className="dripicons dripicons-archive"></i>
                                            <span>Gestion</span>
                                        </a>
                                        {/* <ul className="submenu">
                                            <li className="nav-item"><a className="nav-link"
                                                                        href="/settings/accounting"><i
                                                className="dripicons dripicons-archive"></i>Comptabilité</a></li>
                                            <li className="nav-item"><a className="nav-link"
                                                                        href="/settings/commissions"><i
                                                className="dripicons dripicons-wallet"></i>Commissions</a></li>
                                            <li className="nav-item"><a className="nav-link"
                                                                        href="/settings/simulation"><i
                                                className="dripicons dripicons-checklist"></i>Simulation de commissions</a>
                                            </li>
                                        </ul>*/}
                                    </li>

                                    <li className="last-elements">
                                        <a href="/settings/files?country=033">
                                            <i className="dripicons dripicons-folder-open"></i>
                                            <span>GED</span>
                                        </a>

                                    </li>

                                    <li className="xs-show last-elements">
                                        <a className="nav-link" href="/settings/profile"><i
                                            className="dripicons dripicons-information"></i>Mes informations</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBarNlManager;
