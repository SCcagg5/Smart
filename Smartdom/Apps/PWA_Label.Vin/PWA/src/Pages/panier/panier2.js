import React, {useEffect} from "react";
import MuiBackdrop from "../../Components/Loading/MuiBackdrop";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select/Select";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FaceIcon from "@material-ui/icons/Face";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import EmailIcon from "@material-ui/icons/Email";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CajooService from "../../provider/cajooservice";
import LabelService from '../../provider/labelservice'
import {StripeCardInput, Input} from "react-rainbow-components";

import rethink from "../../controller/rethink";
const db_name="labelvinQRcode"
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


export default function Panier(props){


    /*const stripe = useStripe();
    const elements = useElements();*/





    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [openPayModal, setOpenPayModal] = React.useState(false);

    const [cart, setCart] = React.useState([]);
    const [cartQuantite, setCartQuantite] = React.useState(0);
    const [sousTotal, setSousTotal] = React.useState(0);
    const [livraison, setLivraison] = React.useState(0);

    const [userFname, setUserFname] = React.useState(localStorage.getItem("fname") || "");
    const [userEmail, setUserEmail] = React.useState(localStorage.getItem("email") || "");
    const [stripeCard, setStripeCard] = React.useState(null);
    const [tables,setTable]=React.useState([])





    const total = parseFloat(livraison) + parseFloat(sousTotal)

    useEffect(() => {
        createDB()
        getCart()
        getPayment_gateways()

    }, []);

const createDB=()=>{
    rethink.createDB(db_name,"test").then( r1 => {
        if (r1 === true) console.log("NEW DB CREATED");
        if (r1 === false) console.log("DB ALREADY EXIST");


    })
    }
    const openSnackbar = (type, msg) => {
        setOpenAlert(true)
        setAlertType(type)
        setAlertMessage(msg)
    };

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false)
    };


     async function verifIsTableExist(table){
        let tableList =tables
        if(tableList.includes(table) === true){
            console.log("TABLE EXIST")
            return true;
        }else{
            console.log("CREATE TABLE")
            tableList.push(table);
            setTable(tableList)
            let verif =  await rethink.createTable(db_name, table, "test");
            return verif;
        }
    }
  const  addNewQRCode=(id,text,annee,idasset)=> {
       setLoading(true)

        verifIsTableExist("QrCode").then( v => {
           let data ={
               idcmd :id,
               text:text,
               annee:annee,
               idasset:idasset


           }


            rethink.insert("test",'table("QrCode").insert('+ JSON.stringify(data) + ')',db_name,false).then( resAdd => {
                console.log(resAdd)
                if (resAdd && resAdd === true) {
                    openSnackbar('success', data.idcmd + ' est ajouté avec succès ');

                    setLoading(false)
                } else {
                    setLoading(false)
                    openSnackbar("error","Une erreur est survenue !")
                }
            }).catch(err => {
                setLoading(false)
                openSnackbar("error","Une erreur est survenue !")
                console.log(err)
            })

        }).catch(err => {console.log(err)})
    }

    const viderPanier = () => {
        localStorage.setItem('cart', JSON.stringify([]))
        props.onClearPanier()
        setCart([])
        setCartQuantite(0)
    }

    const getCart = () => {
        let sousTotal = 0
        let cart = localStorage.getItem('cart')
        if (cart !== null && cart !== undefined) {
            cart = JSON.parse(cart)
            console.log(cart)
            cart.map((item, key) => {
                let d = parseFloat(item.price) * parseInt(item.quantite)
                sousTotal = (parseFloat(sousTotal) + d)
            })
            setCart(cart)
            setCartQuantite(cart.length)
            setSousTotal(sousTotal.toFixed(2))
        }
    }

    const getPayment_gateways = () => {
        CajooService.getPayment_gateways().then(r => {
            console.log(r)
        }).catch(err => {console.log(err)})
    }


    const validateStripePayment = async () => {

        /*setOpenPayModal(false)
        setLoading(false)*/

        /*const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                email:"Etiquettepers@yopmail.fr",
                name:"Etiquettepers Etiquettepers"
            }
        });
        if (payload.error) {
            console.log(payload.error)
        } else {
            console.log(payload.paymentMethod)

            CajooService.get_stripe_client_secret({amount:1500,currency:"eur"}).then( async res => {

                const result = await stripe.confirmCardPayment(res.data.clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            email:"Etiquettepers@yopmail.fr",
                            name:"Etiquettepers Etiquettepers"
                        },
                    },
                    setup_future_usage: 'off_session',
                });
                console.log(result)
                if (result.error) {
                    console.log(result.error);
                } else if (result.paymentIntent.status === 'succeeded') {
                    console.log("PAYMENT OK")
                }
            }).catch( err => {console.log(err)})
        }*/


        setLoading(true)

        localStorage.setItem("email",userEmail)
        localStorage.setItem("fname",userFname)

        const { stripe, card, isComplete } = stripeCard;

        if (isComplete) {
            try {

                CajooService.get_stripe_client_secret({amount:1500,currency:"eur"}).then( async res => {

                    const result = await stripe.confirmCardPayment(res.data.clientSecret, {
                        payment_method: {
                            card,
                            billing_details: {
                                name:userFname,
                                address: "17 rue de liberté, 20155 Paris France",
                            },
                        },
                        setup_future_usage: 'off_session',
                    });
                    console.log(result)
                    if (result.error) {
                        console.log(result.error);
                    } else if (result.paymentIntent.status === 'succeeded') {

                        stripe.createToken(card).then(function(result) {
                            console.log(result)
                            if( result.token ) {

                                let line_items = [];
                                cart.map((item,key) => {
                                    line_items.push({
                                        product_id: item.id,
                                        quantity: item.quantite
                                    })
                                })
                                let order = {
                                    set_paid: true,
                                    payment_method:"stripe",
                                    payment_method_title:"carte de paiement (Stripe)",
                                    billing: {
                                        first_name: "label",
                                        last_name: "Etiquettepers.js",
                                        address_1: "17 rue de liberté",
                                        city: "Paris",
                                        state: "PA",
                                        postcode: "12345",
                                        country: "FR",
                                        email: "Etiquettepers@Etiquettepers.fr"
                                    },
                                    shipping: {
                                        first_name: "label",
                                        last_name: "Etiquettepers.js",
                                        address_1: "17 rue de liberté",
                                        city: "Paris",
                                        state: "PA",
                                        postcode: "12345",
                                        country: "FR",
                                        email: "Etiquettepers@Etiquettepers.fr"
                                    },
                                    line_items: line_items
                                };

                                setOpenPayModal(false)


                                CajooService.addOrder(order).then( orderRes => {
                                    console.log(orderRes)
                                    if (orderRes.status === 201) {

                                    setLoading(false)
                                        let data = JSON.parse(localStorage.getItem('etiquette'))
                                        if (data!=null){
                                            data.id=orderRes.data.id
                                            data.total=sousTotal
                                            let QrCOdeDAta={
                                                name:"label",
                                                number:line_items.length,
                                                description:"label"
                                            }
                                            LabelService.createAsset(QrCOdeDAta).then((res)=>{
                                                if (res&&res.status===200){
                                                    LabelService.getCodes(res.data.id).then((ress)=>{
                                                        if (ress&&ress.status===200){
                                                            data.codes=ress.data.qr
                                                            CajooService.generateTicket(data)
                                                            addNewQRCode(orderRes.data.id,data.nom,data.annee,res.data.id)

                                                        }
                                                    })

                                                }
                                            })

                                        }
                                    openSnackbar("success", "Félicitation ! Votre commande est effectué avec succès")
                                    //sendTokenToServer( result.token.id, orderRes.data.id  );
                                    viderPanier()
                                    props.onClearPanier()
                                    /*setTimeout(() => {
                                        navigateTo("/home/profil")
                                    },1500)*/
                                }

                                }).catch(err => {console.log(err)})
                            } else {
                                console.log( "There was a problem", result );
                            }
                        })
                    }
                }).catch(err => {console.log(err)})
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const  sendTokenToServer = ( token, order_id ) => {

        var url = "https://label.vin/wp-json/wc/v2/stripe-payment";

        var formData = new FormData();

        formData.append("order_id", order_id);
        formData.append("payment_token", token);
        formData.append("payment_method", 'stripe');

        var request = new XMLHttpRequest();
        request.open("POST", url);
        request.send(formData);
        request.onload = (e) => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(request)
                } else {
                    console.log("Error", request)
                }
            }
        };

    }

    return(
        <div>
            <MuiBackdrop open={loading}/>
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
                    {
                        cart.length !== 0 ?
                        <div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-8">
                                <h4 style={{fontWeight: "bold"}}>Votre produit</h4>

                            </div>
                            <div className="col-3 text-center">
                                <DeleteOutlineIcon onClick={() => {
                                    viderPanier()
                                }} color="secondary"/>

                            </div>

                        </div>

                        <div className="mt-2">
                            {cart.map((item, key) => (
                                <div className="px-3 py-1 mt-1" style={{
                                    borderStyle: "solid",
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "#a6a6a6"
                                }}>
                                    <div className="row align-items-center">
                                        <div className="col-3">
                                            <img alt="" src={item.images[0].src} style={{width: '100%'}}/>
                                        </div>
                                        <div className="col-5">
                                            <div>
                                                {item.name}
                                            </div>
                                            <div style={{fontWeight:700}}>
                                                {item.price + " €"}
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
                                                    <div onClick={() => {}}
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
                                                    <div onClick={() => {}}
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
                    </div> :

                            <div align="center" style={{marginTop:30}}>
                                <img alt="" src={require("../../assets/images/no_products_cart.jpg")} style={{width:"80%"}}/>
                                <h6>Aucun produit encore ajouté dans votre panier</h6>
                            </div>

                    }
                </div>
                <hr style={{height: 1, width: "100%", backgroundColor: '#a6a6a6'}}/>
                {
                    cart.length !== 0 &&
                    <div className="px-2">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-4">
                                <text>Sous-total</text>

                            </div>
                            <div className="col-4">
                                <text>{sousTotal} €</text>

                            </div>

                        </div>
                        <div className="row align-items-center justify-content-between mt-2">
                            <div className="col-4">
                                <text>Livraison</text>

                            </div>
                            <div className="col-4">
                                <text>{livraison} €</text>

                            </div>

                        </div>
                        <div className="row align-items-center justify-content-between mt-2">
                            <div className="col-4">
                                <text style={{fontWeight: "bold"}}>Total</text>

                            </div>
                            <div className="col-4">
                                <text style={{fontWeight: "bold"}}>{total.toFixed(2)} €</text>

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
                                    <Button style={{borderRadius: 20,fontWeight:700,textTransform:"none",marginTop:15}} variant="contained" color="secondary"
                                            onClick={() => {
                                                setOpenPayModal(true)
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
                setOpenPayModal(false)
            }}
                    aria-labelledby="simple-dialog-title" open={openPayModal}
            >
                <AppBar color="default">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => {
                            setOpenPayModal(false)
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
                            value={userFname}
                            icon={<FaceIcon/>}
                            onChange={event => setUserFname(event.currentTarget.value)}
                        />
                        <div style={{marginTop: 25}}>
                            <StripeCardInput
                                    apiKey={"pk_test_DzPutapEGMVUdss4QraUUYyA"}
                                    label="Stripe Credit/Debit Card Information"
                                    onChange={event => setStripeCard(event)}
                                    error={(stripeCard && stripeCard.error && stripeCard.error.message)}
                                    locale="fr"
                                />

                                {/*<fieldset className="FormGroup">
                                    <CardField
                                        onChange={(e) => {
                                            console.log(e)
                                        }}
                                    />
                                </fieldset>*/}

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
                                value={userEmail}
                                icon={<EmailIcon/>}
                                onChange={event => setUserEmail(event.currentTarget.value)}
                                disabled={localStorage.getItem("email") !== null || localStorage.getItem("email") !== undefined}
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
                                        validateStripePayment()
                                    }}
                                    style={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: 20,
                                        width: "70%",
                                        height: 40
                                    }}>Payer {sousTotal + " €"}</Button>
                        </div>


                    </div>
                </div>


            </Dialog>

            <Snackbar
                open={openAlert}
                autoHideDuration={7000}
                onClose={closeSnackbar}
            >
                <Alert elevation={6} variant="filled" onClose={closeSnackbar} severity={alertType}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )



}
