import React, {Component, Suspense} from 'react';
import Topbar from "../../components/TopbarRecettes";
import Navbar from "../../components/Navbar";


import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import "video-react/dist/video-react.css"; // import css
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import firebase from "firebase";
import  Loader from "../../components/Loader"
import magazine from "../../assets/images/magazine.jpg"
import hourglass from "../../assets/images/hourglass.svg"
import chef_hat from "../../assets/images/chef_hat.svg"

import ClampLines from 'react-clamp-lines';
import velo from "../../assets/images/velo.png"
import velairLight from "../../assets/images/velairLight.jpg"
import speed from "../../assets/images/speed.jpg"
import VelairCruiser2 from "../../assets/images/velairCruiser2.jpg"
import VelairCruiser3 from "../../assets/images/cruiser3.jpg"
import CitroenAmi from "../../assets/images/Citroen_Ami.jpg"

import logo from '../../assets/images/logos/logoSmartCo.jpeg';

import Gcalendy from "../../components/Gcalendy/Gcalendy";







import Snackbar from "@material-ui/core/Snackbar"

import { Player } from 'video-react';


const loading = () => <Loader/>;


class reservation extends Component {
    constructor(props){
        super(props);
        this.changeActivePage=this.changeActivePage.bind(this)
        this.state={
            test:45,

            openAlert: false,
            alertMessage: "",
            alertType: "",
            loading :false,
            percentage:"",
            dataLength:"",
            showAcceuil:true,
            showVille:false,
            showVtc:false,
            showCompact:false,
            showVE:false,

            ville:[],
            selectedDate: "",
            typeDate: "",
            times: [
                {text: "08:00", showConfirm: false, show: true},
                {text: "08:30", showConfirm: false, show: true},
                {text: "09:00", showConfirm: false, show: true},
                {text: "09:30", showConfirm: false, show: true},
                {text: "10:00", showConfirm: false, show: true},
                {text: "10:30", showConfirm: false, show: true},
                {text: "11:00", showConfirm: false, show: true},
                {text: "11:30", showConfirm: false, show: true},
                {text: "12:00", showConfirm: false, show: true},
                {text: "12:30", showConfirm: false, show: true},
                {text: "13:00", showConfirm: false, show: true},
                {text: "13:30", showConfirm: false, show: true},
                {text: "14:00", showConfirm: false, show: true},
                {text: "14:30", showConfirm: false, show: true},
                {text: "15:00", showConfirm: false, show: true},
                {text: "15:30", showConfirm: false, show: true},
                {text: "16:00", showConfirm: false, show: true},
                {text: "16:30", showConfirm: false, show: true},
                {text: "17:00", showConfirm: false, show: true},
            ],
            events: []

        }
    }

    componentDidMount() {


    }

    changeActivePage(name){
        this.setState({ showAcceuil:false,
            showVille:false,
            showVtc:false,
            showCompact:false,
            showVE:false})

        this.setState({[name]:true})
    }





    render() {

        return (
            <div >
                <header id="topnav" style={{backgroundColor:"#ffffff"}}>
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>



                <div className="wrapper">
                    <div className="container-fluid w-100 mt-5 ">




                                <div>
                                    <Gcalendy times={this.state.times} title={"Booking pour "} duree={localStorage.getItem("duree")}
                                        prix={localStorage.getItem("prix")}    history={this.props.history}  logo={localStorage.getItem("veloImage")}  gCalendarMail={"fabiensmartco@gmail.com"}
                                    />
                                </div>



                    </div>






                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnackbar}
                        variant={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                </Snackbar>
            </div>


        );
    }
}

export default reservation;
