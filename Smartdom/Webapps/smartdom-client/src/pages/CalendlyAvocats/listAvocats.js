import React, {Component, Suspense} from "react";
import defaultAvatar from "../../assets/images/users/default_avatar.jpg"
import {Container} from "reactstrap";
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database"

const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;

class listAvocats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem:'item-avocats',
            listAvocats:[]
        };
    }

    componentWillMount() {
        this.setState({loading:true})
        firebase.database().ref('/users').on('value', (snapshot) => {
            const users = snapshot.val() || [];
            let usersArray = Object.keys(users).map(i => users[i])
            let avocats = [];
            for(let i=0 ; i < usersArray.length ; i++){
                if(usersArray[i].role === "avocat")   avocats.push(usersArray[i]);
            }
            this.setState({listAvocats:avocats,loading:false})
        });
    }

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
                            <h4 className="mb-3" style={{marginTop:20}}>Avocats</h4>
                            <div className="row">
                                <div className="col-xl-10 order-xl-1 order-2">
                                    {
                                        this.state.listAvocats.map((item, key) => (

                                            <div className="card-box mb-2">
                                                <div className="row align-items-center">
                                                    <div className="col-sm-5">
                                                        <div className="media">
                                                            <img className="d-flex align-self-center mr-3 rounded-circle"
                                                                 src={item.imageUrl || defaultAvatar }
                                                                 alt="" height="64"/>
                                                            <div className="media-body">
                                                                <h4 className="mt-0 mb-2 font-16">{item.nom+" "+item.prenom} </h4>
                                                                <p className="mb-1"><b>Langues:</b>{item.langues} </p>
                                                                <p className="mb-0"><b>Spécialité:</b>{item.specialite}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <p className="mb-1 mt-3 mt-sm-0"><i
                                                            className="mdi mdi-email mr-1"></i> {item.email}
                                                        </p>
                                                        <p className="mb-0"><i
                                                            className="mdi mdi-phone-classic mr-1"></i> {item.phone}</p>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <div className="text-center mt-3 mt-sm-0">
                                                            <div className="badge font-13 bg-soft-success text-success p-1">
                                                                Tarif:&nbsp;{item.tarif+"€/h"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-1">
                                                        <div className="text-sm-right text-center mt-2 mt-sm-0">
                                                            <Link to={{pathname:"/detailAvocatsCalendly",state:{avocat:item}}}
                                                             className="actiondetails-icon" aria-expanded="true">
                                                                <i className="mdi mdi-arrow-right-bold-circle" style={{fontSize:35}}/>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }


                                </div>
                            </div>
                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }

}

export default listAvocats;