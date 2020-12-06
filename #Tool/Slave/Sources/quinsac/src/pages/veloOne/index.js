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

import bouteille from '../../assets/images/vin/1bouteille.jpeg'
import certif from '../../assets/images/vin/certif.jpeg'
import solaireB from '../../assets/images/vin/solaireB.jpeg'









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
                            <div>
                                <div className="row justify-content-end">
                                    <div className="px-1 "  style={{backgroundColor:"yellow",padding:0.5,cursor:"pointer"}}>
                                        <h5>Point de livraison  </h5>
                                    </div>
                                    <div className="ml-3 px-1 mr-5"  style={{backgroundColor:"yellow",padding:0.5,cursor:"pointer"}}>
                                        <h5> Comment ça marche ? </h5>
                                    </div>

                                </div>
                        <div className="row">
                            <div className="col-md-4 ">
                                {/* <img src={velo} style={{width:"100%",marginLeft:"auto"}}/> */}
                                <div>
                                    <h3>
                                        From
                                    </h3>
                                </div>

                                <div className="row">

                                    <img src={bouteille} style={{width:"50%"}} />
                                    <img src={certif} style={{width:"50%"}} />

                                </div>

                                <div>
                                    <h3>
                                        To
                                    </h3>
                                </div>

                                <div>

                                    <img src={solaireB} style={{width:"100%"}}/>

                                </div>

                            </div>
                            <div className="col-md-8 d-flex justify-content-center text-left  " style={{backgroundColor:"#01497b"}}>
                                <div className="col-md-10 mt-auto mb-auto ">
                                    <div>
                                <h1  style={{color:"white",fontStyle:"serif"}}>
                                    BACCHUS & SOLAR, dans le cadre
                                    de son approche responsable, BCorp,
                                    propose d’acquérir des bouteilles de
                                    Bordeaux qui donne un % d’une
                                    centrale solaire.
                                </h1>
                                    </div>
                                    <div className="mt-5">
                                        <h1  style={{color:"white",fontStyle:"serif"}}>
                                            Ceci vous permettra, soit d’investir
                                            dans la société* , soit de prêter de
                                            l’argent à 2%:an **(4 fois le livret A,
                                            sur 5 ans) .
                                        </h1>
                                    </div>

                                </div>
                            </div>


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
