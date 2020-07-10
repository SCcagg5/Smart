import React, {Component, Suspense} from "react";
import "firebase/database";
import 'firebase/storage';
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";
import posed from 'react-pose';
import  switzerland from "../../assets/images/domiciliation/switzerland.svg"
import  tablette from "../../assets/images/domiciliation/tablette.jpeg"
import  customer from "../../assets/images/domiciliation/customer.svg"
import  salon from "../../assets/images/domiciliation/salon.jpeg"
import  personalFinance from "../../assets/images/domiciliation/personalFinance.svg"
import  freshNotifications from "../../assets/images/domiciliation/freshNotifications.svg"
import  adresse from "../../assets/images/domiciliation/adresse.svg"
import  mailbox from "../../assets/images/domiciliation/mailbox.svg"
import  todolist from "../../assets/images/domiciliation/todolist.svg"
import  chatbot from "../../assets/images/domiciliation/chatbot.svg"
import  mapdark from "../../assets/images/domiciliation/mapdark.svg"
import  cloud from "../../assets/images/domiciliation/cloud.svg"
import  adjustment from "../../assets/images/domiciliation/adjustment.svg"
import  geneve from "../../assets/images/domiciliation/geneve.jpg"
import laussanne from "../../assets/images/domiciliation/laussanne.jpg"
import fribourg from "../../assets/images/domiciliation/fribourg.jpg"
import programming from "../../assets/images/domiciliation/programming.svg"
import businessShop from "../../assets/images/domiciliation/businessShop.svg"
import instagram from "../../assets/images/socialMedia/instagram.svg"
import linkedin from "../../assets/images/socialMedia/linkedin.svg"
import facebook from "../../assets/images/socialMedia/facebook.svg"
import twitter from "../../assets/images/socialMedia/twitter.svg"
import user from "../../assets/images/users/user-5.jpg"
import customerWhite from "../../assets/images/domiciliation/customerWhite.svg"
import Rgeneve from "../../assets/images/domiciliation/republique de geneve.png"
import vaud from "../../assets/images/domiciliation/contant de vaud.png"


const Topbar = React.lazy(() => import("../../components/Topbar"));
const loading = () => <Loader/>;


moment.locale('fr');


const Box = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
        scale: 1.13,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
    press: {
        scale: 1.1,
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    }
});



class  domiciliation extends Component {



    constructor(props) {
        super(props);



        this.state = {
            modalAssistance: false,
            modalWebCoferance: false,
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            openAlert: false,
            alertMessage: '',
            alertType: '',
            selectedPays: 'Suisse',

            showModal2: false,

            showModal: false,
            stoOperation: false,


        }

    }





    render() {



        return (





            <div className="bg-dark" >


                <header id="topnav" >
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div  className="wrapper " style={{backgroundColor:"#ffffff"}} >

                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}





                            <section className="bg-white" >

                            <div className="row bg-white justify-content-center"   >
                                <div className="col-md-5 align-self-center" >


                                    <div className="row  ">
                                        <h1 style={{fontFamily:" Georgia, serif"}}>
                                            <label style={{fontWeight:"bold",fontFamily:" Georgia, serif"}}> La domiciliation </label> de votre entreprise à Lausanne et
                                        </h1>
                                        <h1 style={{fontFamily:" Georgia, serif",borderColor:"red",borderBottomColor:"green",borderBottomStyle:"solid"}}>
                                            partout en Suisse

                                        </h1>

                                        <img alt={""} src={switzerland} style={{width:"3%"}}/>
                                    </div>



                                    <div className="mt-5">
                                        <label>En 6 minutes, sans engagement</label>
                                    </div>

                                    <div  className="row justify-content-left mt-5  text-center">
                                        <div className="col col-md-6">


                                            <button  style={{marginRight:"3%",width:"100%",borderColor:"#0c68ca",backgroundColor:"#0c68ca"}}   className="btn btn-primary btn-lg" >
                                                <small style={{fontSize:"0.8vw" ,fontWeight:"bold"}}>ESTIMER MA DOMICILIATION</small>
                                            </button>
                                        </div>
                                        <div className="col col-lg-4">
                                            < button style={{marginRight:"3%",width:"100%",backgroundColor:"white",borderColor:"#a6a6a6"}} className="btn btn-primary btn-lg" >
                                                <img alt={""} src={customer} style={{width:"11%" ,marginRight:"5%"}}/>
                                                <small style={{fontSize:"0.8vw" ,fontWeight:"bold",color:"#a6a6a6"}}>ÉTRE CONTACTÉ</small>
                                            </button>
                                        </div>


                                    </div>

                                    <div className="mt-5">
                                        <h5 style={{fontFamily:"serif" ,fontWeight:"bold"}}>Le service est soutenue par :</h5>
                                    </div>

                                    <div className="row mt-5 justify-content-center">

                                        <div className="col-md-3 d-flex flex-row align-items-end">
                                            <img alt={""} src={vaud} style={{width:"20%"}}/>
                                            <small style={{fontSize:"0.5vw"}} className="ml-2 font-weight-bold">Service de la promotion et de l'economie et de l'innovation(SPEI)</small>

                                        </div>
                                        <div className="col-md-5  d-flex flex-row">
                                            <div className="col-md-6 text-right">

                                            <img alt={""}  src={Rgeneve} style={{width:"70%"}}/>
                                            </div>

                                            <div className="d-flex flex-column justify-content-between" >
                                                <small style={{fontSize:"0.5vw"}}>République et canton de Genève</small>
                                            <small style={{fontSize:"0.5vw",bottom:"true"}} className=" font-weight-bold justify-content-end">Service de la promotion et de l'economie et de l'innovation(SPEI)</small>
                                            </div>

                                        </div>

                                    </div>


                                </div>
                                <div className="col-md-5">
                                    <img alt={""} src={tablette}style={{width:"100%"}}/>

                                </div>


                            </div>


                        </section>
                            <section style={{marginTop:"5%"}} >


                                <div className="row bg-white"style={{padding:"2%"}}   >
                                   <div className="col-md-4 ">
                                       <img alt={""} src={salon} style={{width:"85%"}}/>

                                   </div>
                                    <div className="col-md-8 align-self-lg-center">
                                        <div className="container-fluid bg-white">
                                        <div className="d-flex flex-row ">
                                            <h1 style={{fontFamily:"serif"}}>La domiciliation commerciale avec SmartDom  <img alt={""} src={switzerland} style={{width:'2%', marginLeft:"1%",marginBottom:"0.8%"}}/> </h1>

                                        </div>

                                        <div >
                                            <span>La premiere etape de la création de votre projet.</span>
                                        </div>
                                    </div>

                                        <div className="row" style={{marginTop:"8%"}}>
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <img alt={""} src={personalFinance} style={{width:"100%"}}/>

                                                    </div>
                                                    <div className="col-md-8">
                                                        <div>
                                                            <h5 style={{fontWeight:"bold" ,fontFamily:"serif"}}>Tarifs trasparent</h5>
                                                        </div>
                                                        <div>
                                                            <label style={{color:"#a6a6a6"}}>Des tarifs fixes, sans frais cachés, caution ou dépôt de garantie.</label>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <img alt={""} src={freshNotifications} style={{width:"80%"}}/>

                                                    </div>
                                                    <div className="col-md-8">
                                                        <div>
                                                            <h5 style={{fontWeight:"bold" ,fontFamily:"serif"}}>Sans engagement</h5>
                                                        </div>
                                                        <div>
                                                            <label style={{color:"#a6a6a6"}}>Accorder de la liberté à votre projet!</label>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="row" style={{marginTop:"8%"}}>
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <img alt={""} src={adresse} style={{width:"100%"}}/>

                                                    </div>
                                                    <div className="col-md-8">
                                                        <div>
                                                            <h5 style={{fontWeight:"bold" ,fontFamily:"serif"}}>Adresse professionnelle</h5>
                                                        </div>
                                                        <div>
                                                            <label style={{color:"#a6a6a6"}}>Une selection d'adresse et de centres d'affaires dans toute la France.</label>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <img alt={""} src={mailbox} style={{width:"100%"}}/>

                                                    </div>
                                                    <div className="col-md-8">
                                                        <div>
                                                            <h5 style={{fontWeight:"bold" ,fontFamily:"serif"}}>Courrier en temps réel</h5>
                                                        </div>
                                                        <div>
                                                            <label style={{color:"#a6a6a6"}}>Externalisez la gestion de votre courrier afin de vous concentrer sur votre développement</label>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="row" style={{marginTop:"8%"}}>
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <img alt={""} src={todolist} style={{width:"100%"}}/>

                                                    </div>
                                                    <div className="col-md-8">
                                                        <div>
                                                            <h5 style={{fontWeight:"bold" ,fontFamily:"serif"}}>Services sur mesure</h5>
                                                        </div>
                                                        <div>
                                                            <label style={{color:"#a6a6a6"}}>Reservation de salle, standart téléphonique, location de bureaux, banque en ligne,...</label>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <img alt={""} src={chatbot} style={{width:"100%"}}/>

                                                    </div>
                                                    <div className="col-md-8">
                                                        <div>
                                                            <h5 style={{fontWeight:"bold" ,fontFamily:"serif"}}>service client réactif</h5>
                                                        </div>
                                                        <div>
                                                            <label style={{color:"#a6a6a6"}}>Nos conseillers sont disponibles afin de vous accompagner dans la construction de votre projet.</label>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>



                                    </div>


                                </div>



                            </section>
                            <section style={{marginTop:"7%"  }}  >


                               <div className="container bg-white  d-flex flex-column align-items-center justify-content-center " style={{height:"500px"}}>

                                   <h1 style={{fontFamily:"serif",fontWeight:"bold"}}>Votre domiciliation en quelques click</h1>
                                   <label style={{color:"#a6a6a6"}}>Votre domiciliation en moins de six minutes.</label>

                                   <div className="d-flex justify-content-between " style={{marginTop:"8%"}}>
                                       <div className="col-md-3 d-flex flex-column align-items-center text-center ">
                                           <div >
                                               <img alt={""} src={mapdark} style={{width:"60%"}}/>
                                           </div>
                                           <div className="mt-3">
                                               <div className="numberCircle">1</div>
                                           </div>
                                           <div className="mt-3">
                                               <h6 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Choix de l'adresse.</h6>
                                           </div>
                                           <div>
                                               < small  style={{cursor:"pointer", color:"#0c68ca" ,fontSize:"0.7vw" ,fontWeight:"bold"}}> > VOIR LES TARIFS ASSOCIÉS  </small>
                                           </div>

                                       </div>
                                       <div className="col-md-3 d-flex flex-column align-items-center text-center ">
                                           <div >
                                               <img alt={""} src={adjustment} style={{width:"70%"}}/>
                                           </div>
                                           <div className="mt-3">
                                               <div className="numberCircle">2</div>
                                           </div>
                                           <div className="mt-3">
                                               <h6 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Personnalisation des services.</h6>
                                           </div>
                                           <div>
                                               <a href="/PersonnalisationService"> <small  style={{cursor:"pointer", color:"#0c68ca" ,fontSize:"0.7vw" ,fontWeight:"bold"}}> > DÉCOUVRIR TOUS NOS SERVICES </small></a>
                                           </div>

                                       </div>

                                       <div className="col-md-3 d-flex flex-column align-items-center text-center ">
                                           <div  >
                                               <img alt={""} src={cloud} style={{width:"55%"}}/>
                                           </div>
                                           <div className="mt-3">
                                               <div className="numberCircle">3</div>
                                           </div>
                                           <div className="mt-3">
                                               <h6 style={{fontSize:"1.1vw", fontFamily:"serif ", fontWeight:"bold"}}>Téléchargement de contrat.</h6>
                                           </div>
                                           <div>
                                               <small style={{cursor:"pointer", color:"#0c68ca" ,fontSize:"0.7vw" ,fontWeight:"bold"}}> >EFFECTUEZ MA DOMICILIATION EN LIGNE  </small>
                                           </div>

                                       </div>

                                   </div>




                               </div>



                            </section>
                            <section style={{marginTop:"7%"  }}  >


                                <div className="container  d-flex flex-column align-items-center justify-content-center " style={{height:"500px"}}>

                                    <h1 style={{fontFamily:"serif",fontWeight:"bold"}}>Nos villes de domiciliation</h1>
                                    <label style={{color:"#a6a6a6"}}>3 villes 3 adresse</label>

                                    <div className="d-flex justify-content-between " style={{marginTop:"5%"}}>
                                        <Box className="col-md-4 d-flex flex-column align-items-center text-center " style={{backgroundColor:"transparent",position:"initial"}}>
                                            <Box  >

                                                <img alt={""} src={geneve} style={{width:"100%"}}/>

                                            </Box>

                                            <div className="mt-3">
                                                <h4 style={{fontSize:"2vw", fontFamily:"serif ", fontWeight:"bold"}}>Genève</h4>
                                            </div>

                                        </Box>
                                        <Box className="col-md-4 d-flex flex-column align-items-center text-center " style={{position:"initial"}}>
                                            <Box >
                                                <img alt={""} src={laussanne} style={{width:"100%"}}/>
                                            </Box>

                                            <div className="mt-3">
                                                <h6 style={{fontSize:"2vw", fontFamily:"serif ", fontWeight:"bold"}}>Lausanne</h6>
                                            </div>


                                        </Box>

                                        <Box className="col-md-4 d-flex flex-column align-items-center text-center "style={{position:"initial"}} >
                                            <Box  >
                                                <img alt={""} src={fribourg} style={{width:"90%"}}/>
                                            </Box>

                                            <div className="mt-3">
                                                <h6 style={{fontSize:"2vw", fontFamily:"serif ", fontWeight:"bold"}}>Fribourg</h6>
                                            </div>

                                        </Box>

                                    </div>
                                    <div style={{marginTop:"5%"}}>
                                        <button style={{marginRight:"3%",width:"100%",borderColor:"#0c68ca",backgroundColor:"#0c68ca"}}   className="btn btn-primary btn-lg" >
                                            <small style={{fontSize:"0.8vw" ,fontWeight:"bold"}}>DÉCOUVREZ TOUTES NOS ADRESSES</small>
                                        </button>
                                    </div>




                                </div>



                            </section>
                            <section style={{marginTop:"7%"  }}  >


                                <div className="container  d-flex flex-column align-items-center justify-content-center " style={{height:"580px"}}>

                                    <h1 style={{fontFamily:"serif",fontWeight:"bold"}}>La domiciliation pour quel type de société ? </h1>
                                    <h5  style={{color:"#a6a6a6", width:"60%",textAlign:"center" , marginTop:"5%"}}>Nos services d’adressent principalement à des <label style={{color:"#0c68ca",fontWeight:"bold"}}>sociétés</label> et des <label style={{color:"#0c68ca",fontWeight:"bold"}}> holdings</label>. Nous pouvons également proposer des solutions de domiciliation à des <label style={{color:"#0c68ca"}}><u> associations </u></label> et <label style={{color:"#0c68ca"}} ><u>fondations.</u></label> </h5>

                                    <div className="d-flex justify-content-between " style={{marginTop:"5%"}}>
                                        <div className="col-md-3 d-flex flex-column align-items-center text-center " style={{backgroundColor:"transparent",position:"initial"}}>
                                            <div>
                                                <h4 style={{fontWeight:"bold",color:"#0c68ca"}}>Sociétés</h4>
                                            </div>
                                            <div >

                                                <img alt={""} src={businessShop} style={{width:"65%"}}/>

                                            </div>

                                            <div className="mt-5">
                                                <h6 style={{fontSize:"1.5vw", fontFamily:"serif ", fontWeight:"bold"}}> > Voir les tarifs associés </h6>
                                            </div>

                                        </div>
                                        <div className="col-md-3 d-flex flex-column align-items-center text-center " style={{position:"initial"}}>
                                            <div>
                                                <h4 style={{fontWeight:"bold",color:"#0c68ca"}}>Holding</h4>
                                            </div>
                                            <div >
                                                <img alt={""} src={programming} style={{width:"100%"}}/>
                                            </div>

                                            <div className="mt-5">
                                                <h6 style={{fontSize:"1.5vw", fontFamily:"serif ", fontWeight:"bold"}}> > Voir les tarifs associés </h6>
                                            </div>


                                        </div>




                                    </div>
                                    <div className="container fluid  bg-dark  mt-3 text-center p-4  ">

                                        <button
                                            style={{ width: "25%", borderColor: "#0c68ca", backgroundColor: "#0c68ca" , verticalAlign:"middle" }}
                                            className="btn btn-primary btn-lg text-center " >
                                            <small style={{fontSize: "0.8vw", fontWeight: "bold"}}>JE ME DOMICILIE</small>
                                        </button>
                                    </div>





                                </div>



                            </section>



                            <footer style={{marginTop: "7%"}}>


                                <div className="container  d-flex flex-column align-items-center  " style={{height: "350px"}}>

                                    <div className="row d-flex justify-content-between  text-center" style={{width: "100%"}}>
                                        <div className="col-md-4">

                                            <div>
                                                <h3 className="exemplefantasy" style={{fontWeight: "bold"}}>Smart
                                                    <label style={{color: "#0c68ca"}}>Dom</label>
                                                </h3>
                                            </div>
                                            <div className="d-flex flex-row justify-content-center mt-3">
                                                <img alt={""} className="mr-3" src={linkedin} style={{width: "5%"}}/>
                                                <img alt={""} className="mr-3" src={twitter} style={{width: "5%"}}/>
                                                <img alt={""} className="mr-3" src={facebook} style={{width: "5%"}}/>
                                                <img alt={""} src={instagram} style={{width: "5%"}}/>

                                            </div>

                                        </div>
                                        <div className="col-md-4 flex-column d-flex align-items-center ">

                                            <div className="d-flex flex-column align-items-start">


                                                <h5 className="font-weight-bold " style={{fontFamily: "serif"}}>En savoir plus</h5>


                                                <h6 style={{fontFamily: " serif", color: "#a6a6a6"}}> Blog</h6>
                                                <h6 style={{fontFamily: " serif", color: "#a6a6a6"}}> Centre d'aide</h6>
                                                <h6 style={{fontFamily: " serif", color: "#a6a6a6"}}> Presse</h6>
                                                <h6 style={{fontFamily: " serif", color: "#a6a6a6"}}> CGU / Mentions légales</h6>
                                                <h6 style={{fontFamily: " serif", color: "#a6a6a6"}}> Qui sommes-nous ?</h6>
                                                <h6 style={{fontFamily: " serif", color: "#a6a6a6"}}> Partenariat</h6>
                                            </div>


                                        </div>
                                        <div className="col-md-4 flex-column d-flex align-items-center">

                                            <div className="d-flex flex-column align-items-start">


                                                <h5 className="font-weight-bold " style={{fontFamily: "serif"}}>Contact</h5>


                                                <div className="d-flex flex-row align-items-end mt-3">
                                                    <img alt={""} className="rounded-circle" src={user} style={{width: "10%"}}/>
                                                    <h6 className="ml-2" style={{fontFamily: "serif"}}> Vous avez une question
                                                        ?</h6>

                                                </div>
                                                <div className="d-flex mt-2">
                                                    < button
                                                        style={{backgroundColor: "#0c68ca", borderColor: "#0c68ca", width: "80%"}}
                                                        className="btn btn-small  justify-content-start">
                                                        <img alt={""} src={customerWhite} style={{width: "9%", marginRight: "5%"}}/>
                                                        <small style={{fontSize: "0.7vw", fontWeight: "bold", color: "white"}}>ÉTRE
                                                            RAPPELÉ PAR UN CONSEILLER
                                                        </small>
                                                    </button>
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                </div>


                            </footer>







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

                        </Suspense>

                </div>




            </div >



        )
    }


}


export default domiciliation;
