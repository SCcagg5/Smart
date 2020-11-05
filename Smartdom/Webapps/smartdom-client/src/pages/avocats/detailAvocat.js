import React, {Component, Suspense} from 'react';
import moment from 'moment';
import 'moment/locale/fr'
import CalendarForm from "../../components/calendar/calendar";
import {Container} from "reactstrap";
import Loader from "../../components/Loader";
import defaultAvatar from "../../assets/images/users/default_avatar.jpg"
moment.locale('fr');

const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;

class detailAvocat extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        showDetail: false,
        events: [],
        avocat: "",
        error: '',
        isMenuOpened: false,
        activeMenuItem:'item-avocats',
    };


    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    };

    toggleRightSidebar = () => {
        document.body.classList.toggle("right-bar-enabled");
    };


    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    componentWillMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.push('/avocats');
        } else {
            this.setState({avocat: this.props.location.state.avocat})
        }
    }

    render() {

        return (

            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu}
                                changeActivePage={this.changeActivePage}
                                isMenuOpened={this.state.isMenuOpened}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}

                            <div className="card" style={{marginTop: 20}}>
                                <div className="card-body ">
                                    <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                       onClick={() => this.props.history.goBack()}
                                       className="float-right text-info">Retour</a>
                                    <h4 className="header-title mt-0 mb-2">
                                        Détails
                                    </h4>
                                </div>
                            </div>

                            {
                                this.state.avocat !== "" &&
                                <div className="row" style={{marginTop:25}}>
                                    <div className="col-lg-3 col-xl-3">
                                        <div className="card-box text-center">
                                            <img src={this.state.avocat.imageUrl || defaultAvatar }
                                                 className="rounded-circle avatar-lg img-thumbnail"
                                                 alt="profile-image"/>

                                                <h4 className="mb-0">{this.state.avocat.prenom + ' ' + this.state.avocat.nom}</h4>
                                                <p className="text-muted">{this.state.avocat.specialite} </p>

                                                {/*<button type="button"
                                                        className="btn btn-success btn-xs waves-effect mb-2 waves-light">Follow
                                                </button>
                                                <button type="button"
                                                        className="btn btn-danger btn-xs waves-effect mb-2 waves-light">Message
                                                </button>*/}

                                                <div className="text-left mt-3">
                                                    <h4 className="font-13 text-uppercase">Aparté :</h4>
                                                    <p className="text-muted font-13 mb-3">
                                                        {this.state.avocat.aparte}
                                                    </p>
                                                    <p className="text-muted mb-2 font-13"><strong>Langues :</strong>
                                                        <span className="ml-2">{this.state.avocat.langues} </span></p>

                                                    <p className="text-muted mb-2 font-13"><strong>Numéro de téléphone
                                                        :</strong><span className="ml-2">{this.state.avocat.phone}</span></p>

                                                    <p className="text-muted mb-2 font-13"><strong>Email :</strong>
                                                        <span className="ml-2 ">{this.state.avocat.email}</span></p>

                                                    <p className="text-muted mb-1 font-13"><strong>Pays :</strong>
                                                        <span className="ml-2">France</span></p>
                                                </div>

                                                <ul className="social-list list-inline mt-3 mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-primary text-primary"><i
                                                            className="mdi mdi-facebook"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-danger text-danger"><i
                                                            className="mdi mdi-google"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-info text-info"><i
                                                            className="mdi mdi-twitter"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-secondary text-secondary"><i
                                                            className="mdi mdi-github-circle"></i></a>
                                                    </li>
                                                </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-xl-9">
                                        <div className="card-box">
                                            <h4 className="mb-2">Disponibilité</h4>
                                            <CalendarForm avocat={this.state.avocat}/>
                                        </div>
                                    </div>
                                </div>

                            }

                        </Suspense>
                    </Container>
                </div>
            </div>


        )
    }

}

export default detailAvocat;
