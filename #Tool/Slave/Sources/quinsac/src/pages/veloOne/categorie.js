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
import solaireB from '../../assets/images/vin/solaireB.jpeg'
import solaire from '../../assets/images/vin/solaire.jpeg'










import Snackbar from "@material-ui/core/Snackbar"

import { Player } from 'video-react';


const loading = () =><div className="text-center"></div>;


class categorie extends Component {
    constructor(props){
        super(props);
        this.changeActivePage=this.changeActivePage.bind(this)
        this.payment=this.payment.bind(this)

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
            user:"",

            vin:"",
            params:"",
            role:""

        }
    }

    componentDidMount() {
        const { type } = this.props.match.params;
        this.setState({loading:true})

        firebase.database().ref("users/"+localStorage.getItem('uid')).on("value",(snapshot)=>{
            let user = snapshot.val()
            if  (user===null){
                this.setState({user:user,role:""})
            }else{
                this.setState({user:user,role:user.role})
            }


            console.log(user)
        })




        firebase.database().ref("data/"+type).on("value",  (snapshot) => {
            let vin = snapshot.val()

            console.log("data =>"+vin)



            this.setState({vin:vin,loading:false})
        })


    }



    componentWillReceiveProps(nextProps) {
        const { type } = nextProps.match.params;

        this.setState({loading:true})


        firebase.database().ref("data/"+type).on("value",  (snapshot) => {
            let vin = snapshot.val()

            console.log("data =>"+vin)

            this.setState({vin:vin,loading:false})
        })

    }


  gotoinvoice(data){
        localStorage.setItem("invoiceData",JSON.stringify(this.state.vin))
      this.props.history.push("/invoice")
  }


    payment(itemm){
          let data = this.state.vin
        localStorage.setItem("duree",itemm.duree)
        localStorage.setItem("prix",itemm.prix)
        localStorage.setItem("dataName",data.nom)

        this.props.history.push("/login")

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

        let data = this.state.vin
        let user =this.state.user

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

                                            { data!="" &&
                                                <div className="col-md-3">
                                                    <div>
                                                        <img src={data.imageUrl} style={{height:350,width:"100%" }}>

                                                        </img>

                                                        <div className="text-center">

                                                            <h3>{data.nom}</h3>

                                                        </div>
                                                    </div>
                                                    {(this.state.role != "investisor" ) &&
                                                    <div className="text-center p-2"
                                                         style={{backgroundColor: "#1382c0"}}>
                                                        <div>
                                                            <text style={{color: "white"}}>location (LLD) à partir de
                                                            </text>
                                                        </div>
                                                        <div>
                                                            <text style={{
                                                                color: "white",
                                                                fontSize: 22
                                                            }}>{data.prixToken} TOKENS / MOIS
                                                            </text>
                                                        </div>

                                                        <div
                                                            className="row align-items-center justify-content-around mt-2">
                                                            {data.price.map((itemm, key) =>
                                                                <div className="col-md-auto " style={{
                                                                    borderColor: "white",
                                                                    borderStyle: "solid",
                                                                    borderWidth: 1,
                                                                    cursor: "pointer"
                                                                }} onClick={() => {
                                                                    this.payment(itemm)
                                                                }}>
                                                                    <div>
                                                                        <text
                                                                            style={{color: "yellow"}}>{itemm.prix}</text>
                                                                    </div>
                                                                    <div>
                                                                        <text
                                                                            style={{color: "white"}}>{itemm.duree}</text>
                                                                    </div>

                                                                </div>
                                                            )}


                                                        </div>
                                                    </div>
                                                    }
                                                    {this.state.role ==="investisor"&&
                                                       <div className="text-center">
                                                           <h3 style={{color:"red"}}> sois {data.investissement}  euros</h3>
                                                       </div>
                                                    }

                                                </div>

                                            }
                                            {data!=""&&
                                              <div className="col-md-3 text-center">
                                                  <img src={solaire} style={{height:350}} />
                                                  <div className="col-md-5  p-1" style={{borderRadius:100,backgroundColor:"#9a1913",position:"absolute",top:"15%",right:0}}>
                                                      <h5 style={{color:"white"}}>{data.panneaux} </h5>
                                                  </div>
                                                  <div className="row align-items-start">
                                                      <div className="col-auto">
                                                          <h4>=</h4>
                                                      </div>
                                                      <div className="col-md-10">

                                                      <h4> {data.panneauxText.replace('<br/>', '\n')}</h4>
                                                      </div>
                                                  </div>
                                              </div>
                                            }

                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                       <div style={{height:350}}>

                                                </div>

                                                <div>
                                                    <h4>Sur le toit de cette
                                                        ferme solaire</h4>
                                                </div>
                                                    </div>

                                                    <div className="col-md-9" >

                                                        <img src={solaireB} style={{width:"100%" ,marginTop:200}}/>

                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                        <div className="container-fluid mt-5">

                                            {this.state.role ==="investisor"&&
                                           <div className="row justify-content-end align-items-start">
                                               <div className="col-md-auto ">
                                                   <button className="btn btn-danger bg-danger " style={{borderRadius:500}}>
                                                       <h5 style={{color:"white"}} onClick={()=>{this.gotoinvoice(data)
                                                       }}>Je confirmes l’investissement    </h5>

                                                   </button>


                                               </div>

                                                   <h4>
                                                       de <text style={{color:"red" ,fontWeight:"bold"}}> {data.investissement} euros </text>
                                                   </h4>

                                               <div className="col-md-3">

                                                   <h3>
                                                       sur la ferme solaire
                                                       de château
                                                       Montaigne
                                                   </h3>

                                               </div>


                                           </div>
                                            }


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
