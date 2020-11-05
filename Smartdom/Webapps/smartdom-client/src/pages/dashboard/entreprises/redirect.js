import React, {Component, Suspense} from "react";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import Posts from "../../../components/Posts";


import france from "../../../assets/images/flags/france.png"
import suisse from "../../../assets/images/flags/suisse.png"
import tunisie from "../../../assets/images/flags/tunisie.png"
import {Button, Container} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import ReactNextPaging from "react-next-paging";

import {Line} from "react-chartjs-2";
import Chart from "react-apexcharts";
const Topbar = React.lazy(() => import("../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../components/Navbar"));

const loading = () => <Loader/>;

class redirect extends Component {

    constructor() {
        super();
        this.paginate = this.paginate.bind(this);
        this.getUser= this.getUser.bind(this);


        this.viewer = React.createRef();
        this.docViewer = null;
        this.annotManager = null;
        this.instance = null;
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            societies: [],
            investisors: [],
            users:[],
            currentPage:1,
            postsPerPage:6,
            nom:"",
            prenom:"",
            email:"",
            createdAT:"",
            sName:""



        };
    }





componentDidMount() {
    if(localStorage.getItem('uid') === undefined || localStorage.getItem('uid') === null ){
        this.props.history.push('/login')
    }else{
        if(localStorage.getItem("role") === "avocat"){
            this.props.history.push('/avocat/infos')
        }else if(localStorage.getItem("role") === "fiduciaire"){
            this.props.history.push('/fiduciaire/infos')
        }else{
            this.props.history.push('/courrier')
        }


    }

}


    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    getUser (nom,prenom,email,createdAt,sName){
        this.setState({nom:nom,
        prenom:prenom,
        email:email,
        createdAT:createdAt,
        sName:sName});

    }

    paginate (pageNumber){
        this.setState({currentPage:pageNumber});

    }
    render() {






        return (
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>





            </div>


        )
    }

}

export default redirect;