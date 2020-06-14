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









import Snackbar from "@material-ui/core/Snackbar"

import { Player } from 'video-react';


const loading = () => <Loader/>;


class velair extends Component {
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


                        <h2>
                            Le Speed est un vélo électrique design et ultra léger.
                        </h2>

                        <div >
                            <img src={Caracteristique}/>
                        </div>
                        <div className="row mt-3 align-items-center ">
                            <div className="col-md-3 ">
                                <h4>
                                    Le single-speed des temps modernes
                                </h4>


                                <div style={{width:"90%" }} className="ml-auto mr-auto">
                                    <text>
                                        Votre vélo électrique Speed est un single-speed performant et léger, dans la plus pure tradition des vélos vintage. Le vélo dans son plus simple appareil, mais équipé de 5 modes d’assistance électrique. Du mode 1 au mode 5, votre single-speed Velair vous permettra d’alterner entre le plaisir de pédaler et l’incroyable assistance électrique dans vos montées et obstacles.

                                    </text>
                                </div>

                            </div>
                            <div className="col-md-3 ">
                                <h4>
                                    Du style, du style, encore du style
                                </h4>

                                <div style={{width:"90%" }} className="ml-auto mr-auto">
                                    <text >
                                        Dessiné dans nos ateliers Parisiens, le Speed arbore un cadre acier ultra léger au style résolument vintage. Les grandes roues de 700 lui donne un aspect branché, à l’allure d’un « fixie ». Grâce à son cadre acier léger et résistant Le Speed ne pèse que 15kg, vous pouvez ainsi le porter facilement, même monter vos escaliers avec. Un vélo électrique aussi design que fonctionnel.

                                    </text>
                                </div>

                            </div>

                            <div>
                                <div>
                                    <text>12  Tokens /mois</text>
                                </div>
                                <div>
                                    <Button onClick={()=>{this.props.history.push('/login')}} variant="contained" color="primary" style={{borderRadius:100}}>
                                        Booking
                                    </Button>
                                </div>
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

export default velair;
