import React, {Component, Suspense} from "react";
import "firebase/database";
import 'firebase/storage';
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";
import baseline from "../../assets/images/smartDom/baseline.png"
import ether from "../../assets/images/smartDom/ether.png"
import smartco from "../../assets/images/logos/logoSmartCo.jpeg"
import chart from "../../assets/images/smartDom/chart.svg"
import integration from "../../assets/images/smartDom/integration.svg"
import echange from "../../assets/images/smartDom/echange.svg"
import wallet from "../../assets/images/smartDom/wallet.svg"
import tokinization from "../../assets/images/smartDom/tokenization.svg"
const Topbar = React.lazy(() => import("../../components/Topbar"));
const loading = () => <Loader/>

moment.locale('fr');


class  tokenizeSmartco extends Component {



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

            savoirplus:false


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

                            <div className="row align-items-center">
                                <div className="col-md-10">
                                    <h2 >
                                        Grâce à notre engagement au sein de l’EEA, et Baseline et un acteur genevois , nous travaillons activement sur les normes et façonnons l'avenir de l'adoption de la blockchain d’entreprise,

                                    </h2>

                                </div>
                                <div className="col-md-1">
                                    <img src={baseline} style={{width:"100%"}}/>

                                </div>
                                <div className="col-md-1">
                                    <img src={ether} style={{width:"100%"}}/>

                                </div>

                            </div>

                            <div className="row mt-4 align-items-center">

                                    <img src={smartco} style={{width:"8%",marginLeft:"10%"}}/>


                                <div className="col-md-4">
                                    <label style={{fontSize:17 ,color:"black"}}>
                                        Avec l’offre  TOKENIZE de SMARTCO  nous avons tout en place pour distribuer et gérer les devises numériques et les actifs tokenisés
                                    </label>

                                </div>

                            </div>
                            <div className="row mt-4 align-items-start">

                                <img src={chart} style={{width:"8%",marginLeft:"10%"}}/>


                                <div className="col-md-8">
                                    <div>
                                    <label style={{fontSize:17 ,color:"black"}}>
                                        La tokenisation est le processus de représentation de la titrisation d'un actif du monde réel à l'aide de jetons numériques sur une blockchain
                                    </label>
                                    </div>
                                    <div className="mt-2">
                                        <label style={{fontSize:17 ,color:"black"}}>
                                            C'est un cas d’utilisation significatif  de la technologie blockchain, comportant une partie d'intégration importante. Nous proposons des conseils et des solutions toutes faites dans tous les domaines nécessaires à notre vision d'une plate-forme de jetons de sécurité à 360 ° conforme à la réglementation, y compris des solutions de liquidité et des services de garde .
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <label style={{fontSize:17 ,color:"black"}}>
                                            Une plate-forme de jetons de sécurité regroupe émission, un marché conforme ( compliance. )  à la réglementation FINMA et liquidité garantie à l'intérieur de la plateforme.
                                            Marketplace
                                        </label>
                                    </div>



                                </div>

                            </div>





                        </div>

                        {this.state.savoirplus===true &&
                        <div className="container-fluid mt-5">
                            <div>
                                <h3>
                                    Smartco propose  un processus d'émission indépendant de la plateforme ciblant l'expert du domaine (par exemple, un propriétaire d'actif immobilier), et non un expert juridique et / ou technique
                                </h3>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-md-2 ">
                                    <img src={smartco} style={{width:"80%"}}/>
                                </div>
                                <div className="col-md-6">
                                    <h4>
                                        Smartco et ses partenaires offrent :
                                    </h4>

                                </div>

                            </div>

                            <div className="row justify-content-center mt-4" >
                                <div className="col-md-1">
                                    <img src={chart}style={{width:"100%"}}/>

                                </div>
                                <div className="col-md-3">
                                    <h4 className="font-weight-bold">Une plate-forme devrait de manière transparente </h4>
                                </div>
                                <div className="col-md-5">
                                    <label style={{fontSize:17}}>
                                        Permettre des flux de revenus à long terme tels que les frais de négociation, introduire de nouvelles classes d'investissement (par exemple pour les fournisseurs de liquidité) et inclure toutes les parties impliquées pour bénéficier de la compensation des frais de négociation.

                                    </label>
                                </div>

                            </div>
                            <div className="row justify-content-center mt-3" >
                                <div className="col-md-1">
                                    <img src={echange}style={{width:"100%"}}/>

                                </div>
                                <div className="col-md-3">
                                    <h4 className="font-weight-bold">Échanges et liquidité  </h4>
                                </div>
                                <div className="col-md-5">
                                    <label style={{fontSize:17}}>
                                        Nous proposons un partenaire, freeport, qui offre différentes options pour exécuter un échange de jetons de sécurité conforme à la réglementation avec une liquidité automatisée
                                    </label>
                                </div>

                            </div>
                            <div className="row justify-content-center mt-3" >
                                <div className="col-md-1">
                                    <img src={integration}style={{width:"100%"}}/>

                                </div>
                                <div className="col-md-3">
                                    <h4 className="font-weight-bold">L'intégration  </h4>
                                </div>
                                <div className="col-md-5">
                                    <label style={{fontSize:17}}>
                                        Nous proposons une intégration au niveau technique (par exemple, génération de contrats intelligents, connexion de systèmes ERP), au niveau du processus (par exemple, fourniture de workflows pour démarrer un processus) et également au niveau du marché (par exemple, concepts de liquidité)                                    </label>
                                </div>

                            </div>
                            <div className="row justify-content-center mt-3" >
                                <div className="col-md-1">
                                    <img src={wallet}style={{width:"100%"}}/>

                                </div>
                                <div className="col-md-3">
                                    <h4 className="font-weight-bold">Dérivés et portefeuilles
                                    </h4>
                                </div>
                                <div className="col-md-5">
                                    <label style={{fontSize:17}}>
                                        Nous proposons des portefeuilles d'émissions de dérivés et de logiciels basés sur des règles, négociant automatiquement les actifs sousjacents
                                    </label>
                                </div>

                            </div>
                            <div className="row justify-content-center mt-3" >
                                <div className="col-md-1">
                                    <img src={tokinization}style={{width:"100%"}}/>

                                </div>
                                <div className="col-md-3">
                                    <h4 className="font-weight-bold">Tokenisation en tant que service
                                    </h4>
                                </div>
                                <div className="col-md-5">
                                    <label style={{fontSize:17}}>
                                        Nous proposons des forfaits sur mesure pour répondre aux besoins de chaque client
                                    </label>
                                </div>

                            </div>

                        </div>
                        }




                        <div className="container-fluid mt-4 align-items-center">
                            <div className="row justify-content-around">
                                <div className="col-md-3">
                                    {this.state.savoirplus===false &&
                                    <h5 onClick={()=>this.setState({savoirplus:true})}>
                                        <label style={{cursor:"pointer"}}><u>En savoir plus</u></label>
                                    </h5>
                                    }

                                </div>
                                <div>
                                    <button
                                        style={{width:"120%",backgroundColor: "#0c68ca", borderColor: "#0c68ca",borderRadius:100}}
                                        className="btn btn-small  justify-content-start">
                                        <label style={{ fontWeight: "bold", color: "white"}}>
                                            Mise en relation avec SmartCo
                                        </label>
                                    </button>
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


export default tokenizeSmartco;
