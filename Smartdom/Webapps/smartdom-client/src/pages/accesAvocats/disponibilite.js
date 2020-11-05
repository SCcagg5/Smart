import React, {Component, Suspense} from 'react';
import moment from 'moment';
import 'moment/locale/fr'
import CalendarForm from "../../components/calendar/calendar";
import {Container} from "reactstrap";
import Loader from "../../components/Loader";

moment.locale('fr');

const Topbar = React.lazy(() => import("../../components/TopBarAvocat"));
const Navbar = React.lazy(() => import("../../components/NavBarAvocat"));
const loading = () => <Loader/>;

class disponibilite extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        showDetail: false,
        events: [],
        avocat: JSON.parse(localStorage.getItem('user')),
        error: '',
        isMenuOpened: false,
        activeMenuItem:'item-agenda',
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


                            {
                                this.state.avocat !== "" &&
                                <div className="row" style={{marginTop:25}}>
                                    <div className="col-lg-12 col-xl-12">
                                        <div className="card-box">
                                            <h4 className="mb-2">Ma disponibilité</h4>
                                            <CalendarForm avocat={this.state.avocat} />
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

export default disponibilite;
