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









import Snackbar from "@material-ui/core/Snackbar"

import { Player } from 'video-react';


const loading = () => <div className="text-center"></div>;


class index extends Component {
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

            ville:[]

        }
    }

    componentDidMount() {
        let v =[]
        firebase.database().ref("velo/ville").on("value",  (snapshot) => {
            let velos = snapshot.val()

            velos.map((item,key)=>{
                 v.push(item)
            })

            this.setState({ville:v})
        })


    }

    reservation(item,itemm){

        localStorage.setItem("veloImage" , item.imageUrl)
        localStorage.setItem("duree",itemm.duree)
        localStorage.setItem("prix",itemm.prix)

        this.props.history.push("/reservation")

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
                <div className="container-fluid w-100 mt-5
                ">

                    {
                        this.state.showAcceuil===true &&
                        <div className="row">
                            <div className="col-md-4 ">
                                <img src={velo} style={{width:"100%",marginLeft:"auto"}}/>

                            </div>
                            <div className="col-md-8 d-flex justify-content-center text-center  " style={{backgroundColor:"#01497b"}}>
                                <h1 className="mt-auto mb-auto" style={{color:"white",fontStyle:"serif"}}>
                                    O&A, dans le cadre de son approche
                                    responsable, BCorp, propose à son personnel,
                                    et ses clients de passage des solutions de
                                    déplacements sur base de vélos électriques et
                                    de voitures électrique
                                </h1>
                            </div>


                        </div>
                    }


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

export default index;
