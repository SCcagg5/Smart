import React, {Component, Suspense} from "react";
import "firebase/database";
import 'firebase/storage';
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";
import firebase from 'firebase'
import StripeCheckout from "react-stripe-checkout";
import logo from "../../assets/images/logos/logoSmartDom.jpeg"


import {Button} from "@material-ui/core";

const Topbar = React.lazy(() => import("../../components/Topbar"));
const loading = () => <Loader/>;


moment.locale('fr');






class  forfaitInv extends Component {



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
            data:""


        }

    }

    componentDidMount() {
        this.setState({loading:true})
        firebase.database().ref('tableau').on("value",(snapshot)=>{
            let data=snapshot.val()

            this.setState({data:data})

            console.log(data.petit)

            this.setState({loading:false})
        })
    }
    onToken = (token, addresses,data) => {
        token.forfait={
            data:data

        }
        firebase.database().ref("payment/").push({
            token
        }).then((snap)=>{
            let key = snap.key

            localStorage.setItem("Fkey",snap.key)
            this.props.history.push("/invoice")
        })
    };

    render() {

        let data = this.state.data

        let petit = this.state.data.petit
        let moyen = this.state.data.moyen
        let grand = this.state.data.grand


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






                        <section    >


                            <div className="container  d-flex flex-column align-items-center justify-content-center " style={{height:"580px"}}>
                                {(data!=null || data!="")&&
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col" width="30%"></th>
                                        <th scope="col" className="text-center"> {'<<Petit>> émetteur\n'}<br/>
                                            {'<20 Actionnaires'}</th>
                                        <th scope="col" className="text-center"> {'<<Moyen>> émetteur\n'}<br/>
                                            {'20-29 Actionnaires'}</th>
                                        <th scope="col" className="text-center"> {'<<Grand>> émetteur\n'}<br/>
                                            {'50+ Actionnaires'}</th>
                                    </tr>
                                    </thead>
                                    {this.state.data.petit != undefined &&
                                    <tbody>


                                    <tr>
                                        <th scope="row">
                                            Augmentation de capital numérique
                                        </th>
                                        <td className="text-center">privé :{petit.augmentaionCapital.prive} <br/> public
                                            : {petit.augmentaionCapital.public} </td>
                                        <td className="text-center">privé : {moyen.augmentaionCapital.prive}
                                            <br/> public : {moyen.augmentaionCapital.public}</td>
                                        <td className="text-center">privé : {grand.augmentaionCapital.prive}
                                            <br/> public : {grand.augmentaionCapital.public}</td>

                                    </tr>


                                    <tr>
                                        <th scope="row">
                                            OFFCHAIN  Transferts d'actions numériques
                                        </th>

                                        <td className="text-center">
                                            {petit.transfertAction.transfert} <br/>
                                           <small>{petit.transfertAction.max}</small>

                                        </td>
                                        <td className="text-center">
                                            {moyen.transfertAction.transfert} <br/>
                                            <small>{moyen.transfertAction.max}</small>

                                        </td>
                                        <td className="text-center">
                                            {grand.transfertAction.transfert} <br/>
                                            <small>{grand.transfertAction.max}</small>

                                        </td>


                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            ONCHAIN  Transferts d'actions numériques
                                        </th>

                                        <td className="text-center">
                                            3 CHF - par Trasnfert <br/>
                                            <small>{petit.transfertAction.max}</small>

                                        </td>
                                        <td className="text-center">
                                            3 CHF - par Trasnfert <br/>
                                            <small>{moyen.transfertAction.max}</small>

                                        </td>
                                        <td className="text-center">
                                            3 CHF - par Trasnfert <br/>
                                            <small>{grand.transfertAction.max}</small>

                                        </td>


                                    </tr>
                                    <tr>
                                        <th scope="row">

                                           Registre de partage numérique
                                        </th>
                                        <td className="text-center">
                                            {petit.registrePartage}


                                        </td>
                                        <td className="text-center">
                                            {moyen.registrePartage}


                                        </td>

                                        <td className="text-center">
                                            {grand.registrePartage}


                                        </td>



                                    </tr>
                                    <tr>
                                        <th scope="row">

                                            Numérisation des actions existantes
                                        </th>
                                        <td className="text-center">
                                            One time {petit.numerisationAction} <br/>
                                            <small>
                                                total par entreprise <br/>
                                                incl. tous les actionnaires
                                            </small>
                                        </td>
                                        <td className="text-center">
                                            One time {moyen.numerisationAction} <br/>
                                            <small>
                                                total par entreprise <br/>
                                                incl. tous les actionnaires
                                            </small>
                                        </td>
                                        <td className="text-center">
                                            One time {grand.numerisationAction} <br/>
                                            <small>
                                                total par entreprise <br/>
                                                incl. tous les actionnaires
                                            </small>
                                        </td>


                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            Assemblée générale virtuelle
                                        </th>

                                        <td className="text-center">
                                            <small>Covid jusqu'au 30.06.2020</small>
                                            <br/>
                                            <label>{petit.assembleGenerale.jusqua}</label>
                                            <br/>
                                            <small>À partir du 01.07.2020</small>
                                            <br/>
                                            <label>{petit.assembleGenerale.apartir}</label>
                                        </td>
                                        <td className="text-center">
                                            <small>Covid jusqu'au 30.06.2020</small>
                                            <br/>
                                            <label>{moyen.assembleGenerale.jusqua}</label>
                                            <br/>
                                            <small>À partir du 01.07.2020</small>
                                            <br/>
                                            <label>{moyen.assembleGenerale.apartir}</label>
                                        </td>
                                        <td className="text-center">
                                            <small>Covid jusqu'au 30.06.2020</small>
                                            <br/>
                                            <label>{grand.assembleGenerale.jusqua}</label>
                                            <br/>
                                            <small>À partir du 01.07.2020</small>
                                            <br/>
                                            <label>{grand.assembleGenerale.apartir}</label>
                                        </td>


                                    </tr>

                                    <tr>
                                        <th scope="row">

                                            Achat
                                        </th>
                                       <td className="text-center">
                                           <StripeCheckout



                                               amount={petit.prix * 100}
                                               currency="CHF"
                                               description="SmartDom"
                                               image={logo}
                                               locale="auto"
                                               name="SmartDom"
                                               stripeKey="pk_test_51Gu5l8AL9qNlrkR4v77NlhLVXhWfZEN8bz1hYWfyzAsmnv9W59RIL8SCX2Cq5oQ711Mp314IFNM8u6jaahqQ6vn700RgxiqGzz"
                                               token={(e)=>this.onToken(e,"",petit)}
                                               label="Stripe 💳"

                                           >
                                           <Button variant="contained" color="primary">
                                               Acheter
                                           </Button>
                                           </StripeCheckout>

                                       </td>
                                        <td className="text-center">
                                            <StripeCheckout



                                                amount={moyen.prix * 100}
                                                currency="CHF"
                                                description="SmartDom"
                                                image={logo}
                                                locale="auto"
                                                name="SmartDom"
                                                stripeKey="pk_test_51Gu5l8AL9qNlrkR4v77NlhLVXhWfZEN8bz1hYWfyzAsmnv9W59RIL8SCX2Cq5oQ711Mp314IFNM8u6jaahqQ6vn700RgxiqGzz"
                                                token={(e)=>this.onToken(e,"",moyen)}
                                                label="Stripe 💳"

                                            >
                                            <Button variant="contained" color="primary">
                                                Acheter
                                            </Button>
                                            </StripeCheckout>

                                        </td>
                                        <td className="text-center">
                                            <StripeCheckout



                                                amount={grand.prix * 100}
                                                currency="CHF"
                                                description="SmartDom"
                                                image={logo}
                                                locale="auto"
                                                name="SmartDom"
                                                stripeKey="pk_test_51Gu5l8AL9qNlrkR4v77NlhLVXhWfZEN8bz1hYWfyzAsmnv9W59RIL8SCX2Cq5oQ711Mp314IFNM8u6jaahqQ6vn700RgxiqGzz"
                                                token={(e)=>this.onToken(e,"",grand)}
                                                label="Stripe 💳"

                                            >
                                            <Button variant="contained" color="primary">
                                                Acheter
                                            </Button>
                                            </StripeCheckout>

                                        </td>

                                    </tr>
                                    </tbody>
                                    }

                                </table>

                                }


                            </div>



                        </section>









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


export default forfaitInv;
