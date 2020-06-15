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


const loading = () =><div className="text-center"></div>;


class categorie extends Component {
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
            params:""

        }
    }

    componentDidMount() {
        const { type } = this.props.match.params;

        this.setState({loading:true})

        let v =[]
        firebase.database().ref("velo/"+type).on("value",  (snapshot) => {
            let velos = snapshot.val()

            velos.map((item,key)=>{
                v.push(item)
            })

            this.setState({ville:v,loading:false})
        })


    }

    componentWillReceiveProps(nextProps) {
        const { type } = nextProps.match.params;

        this.setState({loading:true})

        let v =[]
        firebase.database().ref("velo/"+type).on("value",  (snapshot) => {
            let velos = snapshot.val()

            velos.map((item,key)=>{
                v.push(item)
            })

            this.setState({ville:v,loading:false})
        })
    }





    reservation(item,itemm){

        localStorage.setItem("veloImage" , item.imageUrl)
        localStorage.setItem("duree",itemm.duree)
        localStorage.setItem("prix",itemm.prix)
        localStorage.setItem("veloName",item.nom)

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

                        <Suspense fallback={loading()}>

                            {
                                this.state.loading ?
                                    <Loader/> :
                                    <div>
                                        <div className="row ">

                                            {this.state.ville.map((item,key)=>
                                                <div className="col-md-3"  >
                                                    <div>
                                                        <img src={item.imageUrl} style={{width:"100%"}}>

                                                        </img>

                                                        <div style={{position:"absolute" ,bottom:180,left:130}}>

                                                            <h3>{item.nom}</h3>

                                                        </div>
                                                    </div>
                                                    <div className="text-center p-2" style={{backgroundColor:"#1382c0"}}>
                                                        <div>
                                                            <text style={{color:"white"}}>location (LLD) à partir de </text>
                                                        </div>
                                                        <div>
                                                            <text style={{color:"white" ,fontSize:22}}>{item.prixToken} TOKENS / MOIS</text>
                                                        </div>

                                                        <div className="row align-items-center justify-content-around mt-2">
                                                            {item.price.map((itemm,key)=>
                                                                <div className="col-md-auto " style={{borderColor:"white",borderStyle:"solid",borderWidth:1,cursor:"pointer"}} onClick={()=>{this.reservation(item,itemm)}}>
                                                                    <div>
                                                                        <text style={{color:"yellow"}}>{itemm.prix}</text>
                                                                    </div>
                                                                    <div>
                                                                        <text style={{color:"white"}}>{itemm.duree}</text>
                                                                    </div>

                                                                </div>
                                                            )}



                                                        </div>
                                                    </div>

                                                </div>
                                            )}


                                        </div>
                                        <div className="container-fluid mt-5">

                                            <div style={{marginLeft:"20%"}} >
                                                <small>* Tokens O&A, sont des unités de comptes délivrer par la direction de O&A pour les employés de la sociétés ou des clients de passage
                                                </small>
                                            </div>
                                            <div className="mt-3" style={{marginLeft:"20%"}}>
                                                <small>
                                                    ** Une application permet d’acquérir les QR-codes qui permet d’informer O&A de l’utilisation des véhicules électriques
                                                </small>
                                            </div>

                                        </div>
                                    </div>
                            }


                        </Suspense>










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

export default categorie;
