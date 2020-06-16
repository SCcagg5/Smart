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
import Caracteristique from "../../assets/images/caracteristique.png"


import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {FacebookLoginButton, GoogleLoginButton, LinkedInLoginButton} from "react-social-login-buttons";

import StripeCheckout from "react-stripe-checkout";
import oaLogo from "../../assets/images/oaLogo.png"




import Snackbar from "@material-ui/core/Snackbar"

import { Player } from 'video-react';
import moment from "../../components/Gcalendy/Gcalendy";


const loading = () => <Loader/>;


class login extends Component {
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
            amount:0

        }
    }
 componentDidMount() {
        let prix = localStorage.getItem("prix")

     this.setState({amount:(parseInt(prix)).toFixed(0)})
 }

    changeActivePage(name){
        this.setState({ showAcceuil:false,
            showVille:false,
            showVtc:false,
            showCompact:false,
            showVE:false})

        this.setState({[name]:true})
    }

    onToken = (token, addresses) => {
        token.velo={
            name:localStorage.getItem("veloName"),
            prix:localStorage.getItem("prix"),
            heure:localStorage.getItem("heure"),
            date:localStorage.getItem("date"),
            duree:localStorage.getItem("duree")

        }
        firebase.database().ref("payment/").push({
            token
        })
    };




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
                    <div className="container-fluid w-100 mt-5 px-4 ">

                        <div className="col-md-6 ml-auto mr-auto">
                            <form>
                                <div className="mt-3">
                                    <TextField id="standard-primary" label="Email" type="email" style={{width:"100%"}} />
                                </div>
                                <div className="mt-3">

                                    <TextField id="standard-basic" label="Mot de passe" type="password" style={{width:"100%"}} />
                                </div>




                                <div className="row mt-3 align-items-center">
                                    <Checkbox

                                        color="primary"

                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small"  />}
                                        name="checkedI"
                                    />
                                    <text>J’ai lu et accepté conditions d’utilisation </text>



                                </div>
                                <div className="col-md-4 text-center ml-auto mr-auto">
                                    <Button variant="contained" size="small"  style={{width:"100%",backgroundColor:"green" ,color:"white"}}>
                                        Se Connecter
                                    </Button>
                                </div>





                            </form>

                            <div className="mt-3 text-center">
                                <h4 style={{cursor:"pointer" ,color:"blue"}}><u>S'inscrire</u></h4>
                            </div>
                            <div className="mt-1 text-center">
                                <h5>Ou bien</h5>
                            </div>

                            <div className="row align-items-center mt-3 justify-content-around">
                                <div className="col-md-4">
                                    <GoogleLoginButton  align="center"  style={{width:"100%",fontWeight:"bold" ,height:"100%",fontSize:"1.2vw"}} text="Google"/>
                                </div>
                                <div className="col-md-4">
                                    <FacebookLoginButton align="center"  style={{width:"100%",fontWeight:"bold" ,height:"100%",fontSize:"1.2vw",}} text="Facebook"/>
                                </div>

                            </div>

                            <div className="mt-3 text-center">
                                <h5>Ou bien</h5>
                            </div>

                            <div className="mt-3 text-center">
                                <StripeCheckout



                                    amount={this.state.amount * 100}
                                    currency="CHF"
                                    description="Velo One"
                                    image={oaLogo}
                                    locale="auto"
                                    name="Velo One"
                                    stripeKey="pk_test_51Gu5l8AL9qNlrkR4v77NlhLVXhWfZEN8bz1hYWfyzAsmnv9W59RIL8SCX2Cq5oQ711Mp314IFNM8u6jaahqQ6vn700RgxiqGzz"
                                    token={this.onToken}
                                    label="Stripe 💳"

                                >
                                    <button className="btn btn-primary mt-1 ml-2">
                                        Payer avec Stripe
                                    </button>
                                </StripeCheckout>
                                {/*<h4 onClick={()=>{this.props.history.push('./payment')}} style={{cursor:"pointer" ,color:"blue"}}><u>Payer avec Stripe</u></h4>*/}
                            </div>
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

export default login;
