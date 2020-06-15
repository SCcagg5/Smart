import React, {Component, Suspense} from 'react';
import Topbar from "../../components/TopbarRecettes";
import Navbar from "../../components/Navbar";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement,CardNumberElement} from '@stripe/react-stripe-js';
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






import Snackbar from "@material-ui/core/Snackbar"

import { Player } from 'video-react';


const loading = () => <Loader/>;


class stripe extends Component {
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
            showVE:false

        }
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
        const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

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

                        <div className="col-md-3 ml-auto mr-auto mt-3 p-3 border     border-success">

                            <div className="">
                                <TextField id="standard-primary" placeholder="email" type="email" style={{width:"100%"}} />
                            </div>
                            <div className="mt-3">
                        <Elements stripe={stripePromise} >
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />




                        </Elements>
                            </div>

                            <div className="col-md-8 mt-3 text-center ml-auto mr-auto">
                                <Button variant="contained" size="small"  style={{width:"100%",backgroundColor:"green" ,color:"white"}}>
                                    pay $20.00
                                </Button>
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

export default stripe;
