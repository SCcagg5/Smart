import React, {Component} from 'react';
import logo from "../assets/images/logos/logo_white.svg";

class NlTopbar extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark px-5 sticky-top position-sticky" style={{backgroundColor:"#05ba4d"}}>
                    <img className="navbar-brand" src={logo}/>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav">
                            <li className={this.props.page==="accueil"? "nav-item active" :"nav-item "}>
                                <a className="nav-link" href="/" style={{fontSize:20,fontFamily:"Goudarhl"}}>ACCUEIL <span className="sr-only">(current)</span></a>
                            </li>
                            <li className={this.props.page==="shop"? "nav-item active" :"nav-item "}>
                                <a className="nav-link" href="#"style={{fontSize:20,fontFamily:"Goudarhl"}}>SHOP</a>
                             </li>
                            <li className={this.props.page==="mag"? "nav-item active" :"nav-item "}>
                                <a className="nav-link" href="#"style={{fontSize:20,fontFamily:"Goudarhl"}}>MAG</a>
                            </li>
                            <li className={this.props.page==="bodycheck"? "nav-item active" :"nav-item "}>
                                <a className="nav-link" href="#"style={{fontSize:20,fontFamily:"Goudarhl"}}>BODYCHECK</a>
                            </li>

                            <li  className={this.props.page==="recette"? "nav-item active" :"nav-item "}>
                                <a className="nav-link" href="/listrecette"style={{fontSize:20,fontFamily:"Goudarhl"}}>RECETTES</a>
                            </li>
                            <li className={this.props.page==="a propos"? "nav-item active" :"nav-item "}>
                                <a className="nav-link" href="#"style={{fontSize:20,fontFamily:"Goudarhl"}}>A PROPOS</a>
                            </li>
                            <li className={this.props.page==="contact"? "nav-item active" :"nav-item "}>
                                <a className="nav-link" href="#"style={{fontSize:20,fontFamily:"Goudarhl"}}>CONTACT</a>
                            </li>
                            {
                                localStorage.getItem('role')==="admin"&&
                                <li className={this.props.page==="CQM"? "nav-item active" :"nav-item "}>
                                    <a className="nav-link" href="/admin/clients"style={{fontSize:20,fontFamily:"Goudarhl"}}>CQM</a>
                                </li>
                            }

                        </ul>
                        <div className="navbar-text ml-auto">
                            <div className="row justify-content-between  ">
                                <div>
                                    {
                                        localStorage.getItem("role")!=null&&
                                        <div className="nav-user" aria-modal="true">
                                            <a href="/deconnexion" className="username"><i
                                                className="fas fa-user"></i><span>

                                                <text style={{fontSize:20,fontFamily:"Goudarhl"}}> Déconnexion </text>
                            </span></a>
                                        </div>
                                    }
                                    {
                                        localStorage.getItem("role")===null&&
                                        <div className="nav-user" aria-modal="true">
                                            <a href="/login" className="username"><i
                                                className="fas fa-user"></i><span>

                                                <text style={{fontSize:20,fontFamily:"Goudarhl"}}>   Connexion </text>
                             </span></a>
                                        </div>
                                    }


                                </div>
                                <div className="nav-lang ml-2 " aria-modal="true">
                                    <div className="dropdown show" aria-modal="true">
                                        <a className="dropdown-toggle" role="button" id="dropdownMenuLink"
                                           data-toggle="dropdown">
                                            FR
                                        </a>
                                        <div className="dropdown-menu" aria-modal="true">
                                            <a className="dropdown-item" href="https://www.beautysane.com/fr/">
                                                <span className="flag-icon flag-icon-fr"></span><span
                                                className="flag-lang">FR</span>
                                            </a>

                                        </div>
                                    </div>
                                </div>
                                <div className="nav-cart ml-2 " aria-modal="true">
                                    <a href="#" className="cart-icon">
                                        <i className="fas fa-shopping-cart"></i>
                                        <span className="cart-tag"></span>
                                    </a>
                                    <div className="nav-popup" aria-modal="true" style={{display: "none"}}>
                                        <div className="row">
                                            <div className="col-12">
                                            </div>
                                        </div>

                                        <div className="row popup-product text-center">
                                            <div className="col-12">
                                                <p className="cart-empty">Votre panier est vide.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>





                </nav>

            </React.Fragment>
        );
    }
}

export default NlTopbar;
