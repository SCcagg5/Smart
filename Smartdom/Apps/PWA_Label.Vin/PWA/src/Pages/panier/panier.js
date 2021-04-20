import React, {Component} from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select/Select";
import {Button} from "@material-ui/core";
import MuiBackdrop from "../../Components/Loading/MuiBackdrop";
import Dialog from "@material-ui/core/Dialog";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {StripeCardInput, Input} from "react-rainbow-components";
import CloseIcon from '@material-ui/icons/Close';
import FaceIcon from '@material-ui/icons/Face';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EmailIcon from '@material-ui/icons/Email';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {navigateTo} from "../routes/history";
import {loadStripe} from "@stripe/stripe-js";
import {
    CardElement,
    Elements,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";


const stripePromise = loadStripe("pk_test_DzPutapEGMVUdss4QraUUYyA",{locale:'fr'});
const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
        }
    ]
};
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c0c0c0",
            color: "#000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#fce883"
            },
            "::placeholder": {
                color: "#c0c0c0"
            },
            border:"1px solid #c0c0c0"
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
};

const CardField = ({onChange}) => (
    <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange}/>
    </div>
);

class Panier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAlert: false,
            alertMessage: '',
            alertType: '',

            loading: false,
            cart: [],
            cartQuantite: 0,
            sousTotal: 0,
            livraison: 0.99,
            openPayModal: false,
            stripeCard: null,
            userFname: "",
            userEmail: ""

        }

    }

    componentDidMount() {
        this.getCart()
    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg, //***
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };

    viderPanier() {
        localStorage.setItem('cart', JSON.stringify([]))
        this.props.onClearPanier()
        this.setState({cart: [], cartQuantite: 0})
    }

    getCart() {
        let sousTotal = 0
        let cart = localStorage.getItem('cart')
        if (cart !== null && cart !== undefined) {
            cart = JSON.parse(cart)
            cart.map((item, key) => {
                let d = parseFloat(item.price) * parseInt(item.quantite)
                console.log(d)
                sousTotal = (parseFloat(sousTotal) + d)
            })
            this.setState({cart: cart, cartQuantite: cart.length, sousTotal: sousTotal.toFixed(2)})
        }
    }

    async validateStripePayment() {

        const stripe = useStripe();
        const elements = useElements();

        this.setState({openPayModal: false, loading: true})
        /*this.openSnackbar("success", "Paiement effectué avec succès")
        setTimeout(() => {
            this.viderPanier()
            navigateTo("/home/categories")
        }, 2500)*/

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                email:"test@yopmail.fr",
                phone:"",
                name:"Test test"
            }
        });
        if (payload.error) {
            console.log(payload.error)
        } else {
            console.log(payload.paymentMethod)
        }


        /*const { stripe, card, isComplete } = this.state.stripeCard;

        if (isComplete) {
            try {
                const result = await stripe.confirmCardPayment('sk_test_0rg4e2dv9iOAxFCDrWMRgVqg', {
                    payment_method: {
                        card,
                        billing_details: {
                            name:this.state.userFname,
                            address: "17 rue de liberté, 20155 Paris France",
                        },
                    },
                    setup_future_usage: 'off_session',
                });
                if (result.error) {
                    console.log(result.error);
                } else if (result.paymentIntent.status === 'succeeded') {
                    console.log("PAIEMENt OKK")
                }
            } catch (err) {
                console.log(err.message);
            }
        }*/
    }

    render() {
        let total = parseFloat(this.state.livraison) + parseFloat(this.state.sousTotal)

        return (
            <div>
                <MuiBackdrop open={this.state.loading}/>
                <div style={{padding: 10, minHeight: "100vh", marginTop: 50, overflow: "auto"}}>

                    <div className="row align-items-center justify-content-between p-2">
                        <div className="col-2 text-center">
                            <text style={{fontWeight: "bold", fontSize: 18}}>Panier</text>

                        </div>
                        <div className="col-2 text-center">
                            <text style={{color: "red", fontSize: 16}}>Aide</text>

                        </div>
                    </div>
                    <div className="px-2 mt-2">
                        {this.state.cart.length !== 0 &&
                        <div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-8">
                                    <h4 style={{fontWeight: "bold"}}>Votre produit</h4>

                                </div>
                                <div className="col-3 text-center">
                                    <DeleteOutlineIcon onClick={() => {
                                        this.viderPanier()
                                    }} color="secondary"/>

                                </div>

                            </div>

                            <div className="mt-2">
                                {this.state.cart.map((item, key) => (
                                    <div className="px-3 py-1 mt-1" style={{
                                        borderStyle: "solid",
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "#a6a6a6"
                                    }}>
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <img src={item.images[0].src} style={{width: '100%'}}/>
                                            </div>
                                            <div className="col-4">
                                                <div>
                                                    {item.name}
                                                </div>
                                                <div>
                                                    {item.price + " TND"}
                                                </div>

                                            </div>
                                            <div className="col-4">
                                                <div className="p-2">
                                                    <div className=" ml-auto   row justify-content-center mt-2"
                                                         style={{position: "relative", backgroundColor: "#ff7979"}}>


                                                        <div className="col-6 text-center" style={{height: 40}}>
                                                            <text style={{
                                                                fontSize: 22,
                                                                color: "white"
                                                            }}>{item.quantite}</text>
                                                        </div>
                                                        <div onClick={() => this.addQuantite()}
                                                             style={{position: "absolute", left: -21}}>
                                                            <div style={{
                                                                borderRadius: 1000,
                                                                height: 40,
                                                                width: 40,
                                                                position: "relative",
                                                                borderWidth: 1,
                                                                backgroundColor: "red",
                                                            }}>
                                                                <text style={{
                                                                    fontSize: 20,
                                                                    position: "absolute",
                                                                    left: 14,
                                                                    bottom: 6,
                                                                    color: "white"
                                                                }}>+
                                                                </text>
                                                            </div>
                                                        </div>
                                                        <div onClick={() => this.downQuantite()}
                                                             style={{position: "absolute", right: -21}}>
                                                            <div style={{
                                                                borderRadius: 1000,
                                                                height: 40,
                                                                width: 40,
                                                                position: "relative",
                                                                borderWidth: 1,
                                                                backgroundColor: "red"
                                                            }}>
                                                                <text style={{
                                                                    fontSize: 20,
                                                                    position: "absolute",
                                                                    left: 16,
                                                                    bottom: 6,
                                                                    color: "white"
                                                                }}>-
                                                                </text>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                        }
                    </div>
                    <hr style={{height: 1, width: "100%", backgroundColor: '#a6a6a6'}}/>
                    {
                        this.state.cart.length !== 0 &&
                        <div className="px-2">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-4">
                                    <text>Sous-total</text>

                                </div>
                                <div className="col-4">
                                    <text>{this.state.sousTotal} TND</text>

                                </div>

                            </div>
                            <div className="row align-items-center justify-content-between mt-2">
                                <div className="col-4">
                                    <text>Livraison</text>

                                </div>
                                <div className="col-4">
                                    <text>{this.state.livraison} TND</text>

                                </div>

                            </div>
                            <div className="row align-items-center justify-content-between mt-2">
                                <div className="col-4">
                                    <text style={{fontWeight: "bold"}}>Total</text>

                                </div>
                                <div className="col-4">
                                    <text style={{fontWeight: "bold"}}>{total.toFixed(2)} TND</text>

                                </div>

                            </div>

                            <div className="px-2" style={{marginBottom: 50}}>
                                <div className="row align-items-center mt-2 ">
                                    <div className="col-4">
                                        <div className="row align-items-center p-2 text-center " style={{
                                            borderStyle: "solid",
                                            borderColor: "#e6e6e6",
                                            borderWidth: 0,
                                            borderRadius: 10
                                        }}>
                                            <div>
                                                <text className="font-weight-bold"
                                                      style={{
                                                          fontFamily: "IBMPlexSans-Bold",
                                                          fontSize: 15,
                                                          color: "#c6c6c6"
                                                      }}>8 - 15min →
                                                </text>
                                            </div>
                                            <div>
                                                <FormControl className="ml-1" variant="outlined">

                                                    <Select
                                                        style={{height: 30, color: "red"}}
                                                        native

                                                        inputProps={{
                                                            name: 'age',
                                                            id: 'outlined-age-native-simple',
                                                        }}
                                                    >
                                                        <option value={10}>Maison</option>
                                                        <option value={20}>Boulot</option>
                                                        <option value={30}>amie</option>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 text-center">
                                        <Button style={{borderRadius: 20}} variant="contained" color="secondary"
                                                onClick={() => {
                                                    this.setState({openPayModal: true})
                                                }}
                                        >
                                            Commander
                                        </Button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    }
                </div>


                <Dialog fullScreen={true} onClose={() => {
                    this.setState({openPayModal: false})
                }}
                        aria-labelledby="simple-dialog-title" open={this.state.openPayModal}>
                    <AppBar color="default">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={() => {
                                this.setState({openPayModal: false})
                            }} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <div>
                        <div align="center" className="mb-2">
                            <h5 style={{fontWeight: 700, marginTop: 90}}>Paiement sécurisé</h5>
                        </div>

                        <div align="center" style={{marginTop: 20, padding: 30}}>
                            <Input
                                label="Titulaire de la carte"
                                placeholder="Titulaire de la carte"
                                value={this.state.userFname}
                                icon={<FaceIcon/>}
                                onChange={event => this.setState({userFname: event.currentTarget.value})}
                            />
                            <div style={{marginTop: 25,borderRadius:25,border:"1px solid rgba(164,167,181,1)",padding:10}}>
                                {/*<StripeCardInput
                                    apiKey={"pk_test_DzPutapEGMVUdss4QraUUYyA"}
                                    label="Stripe Credit/Debit Card Information"
                                    onChange={event => this.setState({stripeCard:event})}
                                    error={(this.state.stripeCard && this.state.stripeCard.error && this.state.stripeCard.error.message)}
                                    locale="fr"
                                />*/}
                                <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                                    <fieldset className="FormGroup">
                                        <CardField
                                            onChange={(e) => {
                                                console.log(e)
                                            }}
                                        />
                                    </fieldset>
                                </Elements>
                            </div>
                            <div style={{marginTop: 25}}>
                                <FormControlLabel
                                    control={<Checkbox name="checkedA" checked={true}/>}
                                    label="Enregistrer cette carte pour faciliter mes prochaines courses"
                                />
                            </div>
                            <div style={{marginTop: 25}}>
                                <Input
                                    label="Votre email"
                                    type="email"
                                    placeholder="Votre email"
                                    value={this.state.userEmail}
                                    icon={<EmailIcon/>}
                                    onChange={event => this.setState({userEmail: event.currentTarget.value})}
                                />
                                <FormControlLabel
                                    style={{marginTop: 25}}
                                    control={<Checkbox name="checkedA" checked={true}/>}
                                    label="Enregistrer votre email pour recevoir les factures"
                                />
                            </div>
                            <div align="center" style={{marginTop: 40}}>
                                <Button color="secondary" variant="contained"
                                        onClick={() => {
                                            this.validateStripePayment()
                                        }}
                                        style={{
                                            textTransform: "none",
                                            fontWeight: 700,
                                            borderRadius: 20,
                                            width: "70%",
                                            height: 40
                                        }}>Payer 1500$</Button>
                            </div>
                        </div>
                    </div>


                </Dialog>

                <Snackbar
                    open={this.state.openAlert}
                    autoHideDuration={7000}
                    onClose={this.closeSnackbar}
                >
                    <Alert elevation={6} variant="filled" onClose={this.closeSnackbar} severity={this.state.alertType}>
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default Panier;
