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
import facetime from "../../assets/images/smartDom/facetime.png"
import meet from "../../assets/images/smartDom/meet.png"
import reunion from "../../assets/images/smartDom/reunion.png"
import slack from "../../assets/images/smartDom/Slack_logo.svg"
import swisschat from "../../assets/images/smartDom/swisschat.png"





import instagram from "../../assets/images/socialMedia/instagram.svg"
import linkedin from "../../assets/images/socialMedia/linkedin.svg"
import facebook from "../../assets/images/socialMedia/facebook.svg"
import twitter from "../../assets/images/socialMedia/twitter.svg"
import user from "../../assets/images/users/user-5.jpg"
import customerWhite from "../../assets/images/domiciliation/customerWhite.svg"
import Rgeneve from "../../assets/images/domiciliation/republique de geneve.png"
import vaud from "../../assets/images/domiciliation/contant de vaud.png"




import check from "../../assets/images/smartDom/check.svg"



const Topbar = React.lazy(() => import("../../components/Topbar"));
const loading = () => <Loader/>;
const google = window.google;


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



class  fonctionnalite extends Component {



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





                        <div className="container-fluid " >

                            <div className="row bg-white justify-content-start"   >
                               <div className="col-md-4  ">
                                   <h1>Fonctionnalités</h1>
                                  <div className="text-left ml-5 mt-5 ">
                                   <img src={facetime } />
                                   <h1 className="font-weight-bold" style={{color:"#0364c0"}}> Smart.Visio</h1>
                                  </div>

                               </div>
                                <div className="col-md-4">

                                    <img src={meet} style={{width:"100%"}}/>




                                </div>



                            </div>

                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-2 text-center ">
                                            <img src={check} style={{width:"50%"}}/>
                                        </div>

                                           <div className="col-md-10">



                                               <h3 className="font-weight-bold" style={{fontFamily:"sans-serif"}}>Créer une réunion en ligne </h3>
                                           </div>



                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">

                                        </div>
                                        <div className="col-md-10">
                                            <text style={{fontSize:18}}>Tous utiliser SmartDom Meet sans limite pour faire du télétravail ou du home office. Les personnes accrédités peuvent, elles , partage des documents lors de ces réunions en ligne</text>

                                        </div>

                                    </div>


                                </div>
                                <div className="col-md-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-2 text-center ">
                                            <img src={check} style={{width:"50%"}}/>
                                        </div>

                                        <div className="col-md-10">



                                            <h3 className="font-weight-bold" style={{fontFamily:"sans-serif"}}>Fonctionnalités </h3>
                                        </div>



                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">

                                        </div>
                                        <div className="col-md-10">
                                            <text style={{fontSize:18}}>
                                                Partage d’écran, Chat, appel audio et vidéo, accès à des documents partagées, signature qualifiée de ces documents lors des réunions, accès aux outils de planification de réunions                                            </text>

                                        </div>

                                    </div>


                                </div>
                                <div className="col-md-4">
                                    <div className="row ">
                                        <div className="col-md-2 text-center mt-2 ">
                                            <img src={check} style={{width:"50%"}}/>
                                        </div>

                                        <div className="col-md-10">



                                            <h3 className="font-weight-bold" style={{fontFamily:"sans-serif"}}>Données sécurisées en Suisse <img src={switzerland} style={{width:"8%",borderRadius:100}}/></h3>
                                        </div>



                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">

                                        </div>
                                        <div className="col-md-10">
                                            <text style={{fontSize:18}}>Tous utiliser SmartDom Meet sans limite pour faire du télétravail ou du home office. Les personnes accrédités peuvent, elles , partage des documents lors de ces réunions en ligne</text>

                                        </div>

                                    </div>


                                </div>

                            </div>


                        </div>

                        <div className="container-fluid" style={{marginTop:"5%"}} >

                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                    <h1 className="font-weight-bold" style={{color:"#0364c0"}}>SmartCalendar + <img src={facetime} style={{width:"10%"}}/>  Meet  </h1>
                                    </div>
                                    <div>
                                        <img src={reunion} style={{width:"100%"}}/>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                   <h5>Intégration du Smart Meet </h5>
                                    <div>
                                        <h2 className="font-weight-bold">
                                            La planification transparente rencontre la vidéoconférence sans faille
                                        </h2>
                                    </div>
                                    <div className="row mt-3 align-items-start">

                                        <div className="col-md-1 text-center">

                                            <img src={check} style={{width:"60%"}}/>
                                        </div>

                                        <div className="col-md-11">
                                            <text style={{fontSize:16}}>
                                                Inclure automatiquement un lien Meet unique pour chaque réunion que vous planifiez
                                            </text>


                                        </div>

                                    </div>
                                    <div className="row mt-3 align-items-start">

                                        <div className="col-md-1 text-center">

                                            <img src={check} style={{width:"60%"}}/>
                                        </div>

                                        <div className="col-md-11">
                                            <text style={{fontSize:16}}>
                                                Réduisez le travail chargé - plus besoin d'ajouter manuellement des liens  Smart Meet  aux événements du calendrier                                             </text>


                                        </div>

                                    </div>
                                    <div className="row mt-3 align-items-start">

                                        <div className="col-md-1 text-center">

                                            <img src={check} style={{width:"60%"}}/>
                                        </div>

                                        <div className="col-md-11">
                                            <text style={{fontSize:16}}>
                                                Mises à jour automatiques - Les liens Smart meet seront mis à jour si vous reprogrammer des réunions                                             </text>


                                        </div>

                                    </div>
                                    <div className="row mt-3 align-items-start">

                                        <div className="col-md-1 text-center">

                                            <img src={check} style={{width:"60%"}}/>
                                        </div>

                                        <div className="col-md-11">
                                            <text style={{fontSize:16}}>
                                                Augmentez le taux de présence de vos meeting  - donnez à vos invités ou clients le moment et le lien de la salle de réunion                                             </text>


                                        </div>

                                    </div>

                                </div>


                            </div>
                            <div className="text-right">
                                <h2 className="font-weight-bold"style={{color:"#0364c0"}}>Planification en temps réel  : Slack et Smart Chat
                                </h2>
                            </div>
                            <div className="row justify-content-between mt-3">
                                <div className="col-md-5">
                                    <div>
                                    <h3 className="font-weight-bold">Obtenez le Slack Bot et planifiez des réunions où le « travail distant » se déroule </h3>
                                    </div>
                                    <div className="row mt-2 align-items-start">

                                        <div className="col-md-1 text-center">

                                            <img src={check} style={{width:"60%"}}/>
                                        </div>

                                        <div className="col-md-11">
                                            <text style={{fontSize:16}}>
                                                Trouvez le meilleur moment pour rencontrer des collègues occupés en quelques secondes
                                            </text>


                                        </div>

                                    </div>
                                    <div className="row mt-2 align-items-start">

                                        <div className="col-md-1 text-center">

                                            <img src={check} style={{width:"60%"}}/>
                                        </div>

                                        <div className="col-md-11">
                                            <text style={{fontSize:16}}>
                                                Utilisez la commande SmartAgenda pour démarrer un nouveau sondage ou modifier les sondages existants
                                            </text>


                                        </div>

                                    </div>
                                    <div className="row mt-2 align-items-start">

                                        <div className="col-md-1 text-center">

                                            <img src={check} style={{width:"60%"}}/>
                                        </div>

                                        <div className="col-md-11">
                                            <text style={{fontSize:16}}>
                                                Partagez-le sur un channel Slack et/ ou the SwissChat*  ou invitez des externes par e-mail
                                            </text>


                                        </div>

                                    </div>

                                </div>
                                <div className="col-md-5">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <img src={slack} style={{width:"100%"}}/>
                                            </div>
                                            <div className="col-md-6">
                                                <div>
                                                    <img src={swisschat} style={{width:"70%"}}/>
                                                </div>
                                                <div className="text-left">

                                                        <li>
                                                            <small>Swisschat est une messagerie instantanée sécurisé dont les fichiers sont stockés dans des archives sur des datacenters en suisse. </small>
                                                        </li>


                                                </div>

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

                    </Suspense>

                </div>




            </div >



        )
    }


}


export default fonctionnalite;
