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
import WooService from "../../provider/wooService";
import LabelService from '../../provider/labelservice'
import {StripeCardInput, Input} from "react-rainbow-components";

import rethink from "../../controller/rethink";
import SmartService from "../../provider/SmartService";
import utilFunctions from "../../tools/functions";
import moment from "moment";
import maillingService from "../../provider/maillingService";
import {navigateTo} from "../routes/history";

const db_name = "4e92789a-aa10-11eb-bcbc-0242ac130002"


export default function Panier(props) {

    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [openPayModal, setOpenPayModal] = React.useState(false);

    const [cart, setCart] = React.useState([]);
    const [cartQuantite, setCartQuantite] = React.useState(0);
    const [sousTotal, setSousTotal] = React.useState(0);
    const [livraison, setLivraison] = React.useState(0);
    const [etiquettes, setEtiquettes] = React.useState(0);

    const [userFname, setUserFname] = React.useState(localStorage.getItem("fname") || "");
    const [userEmail, setUserEmail] = React.useState(localStorage.getItem("email") || "");
    const [stripeCard, setStripeCard] = React.useState(null);
    const [tables, setTable] = React.useState([])


    const [currentUser, setCurrentUser] = React.useState()




    useEffect(() => {
        createDB()
        getCart()
        getPayment_gateways()
        verif_current_user_registration()
    }, []);

    const createDB = () => {
        rethink.createDB(db_name, "test").then(r1 => {
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


    async function verifIsTableExist(table) {
        let tableList = tables
        if (tableList.includes(table) === true) {
            console.log("TABLE EXIST")
            return true;
        } else {
            console.log("CREATE TABLE")
            tableList.push(table);
            setTable(tableList)
            let verif = await rethink.createTable(db_name, table, "test");
            return verif;
        }
    }

    const addNewQRCode = (id, text, annee, idasset) => {
        setLoading(true)

        verifIsTableExist("QrCode").then(v => {
            let data = {
                idcmd: id,
                text: text,
                annee: annee,
                idasset: idasset
            }
            rethink.insert("test", 'table("QrCode").insert(' + JSON.stringify(data) + ')', db_name, false).then(resAdd => {
                console.log(resAdd)
                if (resAdd && resAdd === true) {
                    openSnackbar('success', data.idcmd + ' est ajouté avec succès ');

                    setLoading(false)
                } else {
                    setLoading(false)
                    openSnackbar("error", "Une erreur est survenue !")
                }
            }).catch(err => {
                setLoading(false)
                openSnackbar("error", "Une erreur est survenue !")
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        })
    }

    const viderPanier = () => {
        localStorage.setItem('cart', JSON.stringify([]))
        props.onClearPanier()
        setCart([])
        setCartQuantite(0)
    }

    const getCart = () => {
        let sousTotal = 0
        let etiquettes = 0;
        let cart = localStorage.getItem('cart')
        if (cart !== null && cart !== undefined) {
            cart = JSON.parse(cart)
            cart.map((item, key) => {
                let d = parseFloat(item.price) * parseInt(item.quantite)
                sousTotal = (parseFloat(sousTotal) + d)
                console.log(item)
                if(item.have_etiquette && item.have_etiquette === true){
                    etiquettes = etiquettes + 1
                }
            })
            setEtiquettes(etiquettes)
            setCart(cart)
            setCartQuantite(cart.length)
            setSousTotal(sousTotal.toFixed(2))
        }
    }

    const getPayment_gateways = () => {
        WooService.getPayment_gateways().then(r => {
            console.log(r)
        }).catch(err => {
            console.log(err)
        })
    }


    const validateStripePayment = async () => {

        setLoading(true)
        localStorage.setItem("email", userEmail)
        localStorage.setItem("fname", userFname)

        if(currentUser !== undefined && currentUser !== null){

        }else{
            let user_data = {
                email:userEmail,
                fname:userFname,
                phone:localStorage.getItem("phone"),
                orders:[],
                odoo_client_id:7,   //static just now
                created_at:moment().format("YYYY-MM-DD HH:mm")
            }
            setCurrentUser(user_data)
            await save_rethink_woo_user(user_data);
        }

        const {stripe, card, isComplete} = stripeCard;
            if (isComplete) {
                try {

                    WooService.get_stripe_client_secret({amount: 1500, currency: "eur"}).then(async res => {

                        const result = await stripe.confirmCardPayment(res.data.clientSecret, {
                            payment_method: {
                                card,
                                billing_details: {
                                    name: userFname,
                                    address: "17 rue de liberté, 20155 Paris France",
                                },
                            },
                            setup_future_usage: 'off_session',
                        });
                        console.log(result)
                        if (result.error) {
                            console.log(result.error);
                        } else if (result.paymentIntent.status === 'succeeded') {

                            stripe.createToken(card).then(function (result) {
                                console.log(result)
                                if (result.token) {

                                    let line_items = [];
                                    cart.map((item, key) => {
                                        line_items.push({
                                            product_id: item.id,
                                            quantity: item.quantite
                                        })
                                    })
                                    let order = {
                                        set_paid: true,
                                        payment_method: "stripe",
                                        payment_method_title: "carte de paiement (Stripe)",
                                        billing: {
                                            first_name: userFname,
                                            last_name: "",
                                            address_1: "17 rue de liberté",
                                            city: "Paris",
                                            state: "PA",
                                            postcode: "12345",
                                            country: "FR",
                                            email: userEmail
                                        },
                                        shipping: {
                                            first_name: userFname,
                                            last_name: "",
                                            address_1: "17 rue de liberté",
                                            city: "Paris",
                                            state: "PA",
                                            postcode: "12345",
                                            country: "FR",
                                            email: userEmail
                                        },
                                        line_items: line_items
                                    };

                                    setOpenPayModal(false)

                                    WooService.addOrder(order).then(async orderRes => {
                                        console.log(orderRes)
                                        if (orderRes.status === 201) {
                                            let dataTicket = JSON.parse(localStorage.getItem('etiquette'))
                                            dataTicket.id=currentUser.id
                                            dataTicket.total=sousTotal
                                            WooService.generateTicket(dataTicket)



                                            let odoo_facture_data = await generate_facture_odoo()
                                            console.log(odoo_facture_data)
                                            if(odoo_facture_data.b64 && odoo_facture_data.b64 !== ""){
                                                let line_items = orderRes.data.line_items || [];
                                                let formated_line_items = []
                                                line_items.map((item,key) => {
                                                    formated_line_items.push({
                                                        id:item.id,
                                                        name:item.name,
                                                        price:item.price,
                                                        product_id:item.product_id,
                                                        quantity:item.quantity,
                                                        total:item.total
                                                    })
                                                })
                                                let orderData = {
                                                    woo_id:orderRes.data.id,
                                                    total:orderRes.data.total,
                                                    date_created:orderRes.data.date_created,
                                                    line_items : formated_line_items,
                                                    payment_method_title: orderRes.data.payment_method_title,
                                                    odoo_fact_id:odoo_facture_data.facture_id,
                                                    odoo_fact_b64:odoo_facture_data.b64
                                                }
                                                let user_data = currentUser
                                                let orders = user_data.orders || [];
                                                orders.push(orderData)
                                                user_data.orders = orders
                                                console.log(user_data)
                                                rethink.update("test",'table("woo_users").get('+JSON.stringify(currentUser.id)+').update('+ JSON.stringify(user_data) + ')',db_name,false).then( updateRes => {
                                                    if (updateRes && updateRes === true) {
                                                        maillingService.send_odoo_facture({
                                                            "emailReciver":currentUser.email,
                                                            "subject":"Facture Label.vin",
                                                            "msg":"Madame/Monsieur,<br/><br/>Suite à votre achat sur notre site <b>label.Vin</b> effectué(e) le "+moment().format("DD-MM-YYYY HH:mm")+" et correspondant au bon de commande n° " +orderRes.data.id +", nous vous adressons ci-joint une facture avec les détails de votre commande.",
                                                            "footerMsg":"<br/><br/>En vous remerciant par avance,<br/><br/><br/>Cordialement",
                                                            "attach":[
                                                                {
                                                                    filename:"Facture_Label.Vin_" + moment().format("DD-MM-YYYY"),
                                                                    path:"data:application/pdf;base64," + odoo_facture_data.b64
                                                                }
                                                            ]
                                                        }).then(sendRes => {
                                                            console.log(sendRes)
                                                        })
                                                        setLoading(false)
                                                        openSnackbar("success", "Félicitation ! Votre commande est effectué avec succès")
                                                        viderPanier()
                                                        props.onClearPanier()
                                                        props.history.push('/home/chat',{b64_odoo_fact:odoo_facture_data.b64})
                                                        //navigateTo("/home/chat",{b64_odoo_fact:odoo_facture_data.b64})
                                                    }else{
                                                        console.log("error update woo user")
                                                    }
                                                }).catch(err => {console.log(err)})

                                            }
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                } else {
                                    console.log("There was a problem", result);
                                }
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } catch (err) {
                    console.log(err.message);
                }
            }
    }

    const generate_facture_odoo = () => {

        return  new Promise((resolve, reject) => {

            SmartService.getToken().then(tokenRes => {
                console.log(tokenRes)
                if (tokenRes.succes === true && tokenRes.status === 200) {

                    SmartService.login({
                        email: "casa.verde@yopmail.com",
                        password1: "test"
                    }, tokenRes.data.token).then(loginRes => {

                        let token = tokenRes.data.token;
                        let usrtoken = loginRes.data.usrtoken
                        let acces_token = utilFunctions.getUID();
                        if (loginRes.succes === true && loginRes.status === 200) {

                            let odoo_data = [{
                                access_token: acces_token,
                                journal_id: 1,
                                message_attachment_count: 0,
                                move_name: false,
                                name: false,
                                origin: false,
                                partner_bank_id: 4,
                                partner_id: 16,
                                payment_term_id: 2,
                                reference: false,
                                sequence_number_next: "0001",
                                type: "out_invoice",
                                user_id: 2,
                                account_id: 281,
                                cash_rounding_id: false,
                                comment: false,
                                company_id: 1,
                                currency_id: 1,
                                date_due: moment().format("YYYY-MM-DD"),
                                date_invoice: moment().format("YYYY-MM-DD"),
                                fiscal_position_id: 1,
                                incoterm_id: false,
                                invoice_line_ids:[]
                            }];

                            let order_products = cart || [];
                            order_products.map((product,key) => {
                                odoo_data[0].invoice_line_ids.push(
                                    [
                                        0,
                                        'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
                                        {
                                            is_rounding_line: false,
                                            name: product.name || "",
                                            origin: false,
                                            price_unit: parseFloat(product.price),
                                            product_id: 1,
                                            quantity: parseInt(product.quantite),
                                            sequence: 10,
                                            uom_id: 1,
                                            currency_id: 1,
                                            discount: 0,
                                            display_type: false,
                                            account_analytic_id: false,
                                            account_id: 636,
                                            analytic_tag_ids: [
                                                [6, false, []
                                                ]
                                            ],
                                            invoice_line_tax_ids:[[6,false,[]]]
                                        }
                                    ]
                                );
                            })

                            if(etiquettes > 0){
                                odoo_data[0].invoice_line_ids.push(
                                    [
                                        0,
                                        'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
                                        {
                                            is_rounding_line: false,
                                            name: "Etiquettes",
                                            origin: false,
                                            price_unit: 7.5,
                                            product_id: 1,
                                            quantity: etiquettes,
                                            sequence: 10,
                                            uom_id: 1,
                                            currency_id: 1,
                                            discount: 0,
                                            display_type: false,
                                            account_analytic_id: false,
                                            account_id: 636,
                                            analytic_tag_ids: [
                                                [
                                                    6,
                                                    false,
                                                    []
                                                ]
                                            ],
                                            invoice_line_tax_ids:[[6,false,[]]]
                                        }
                                    ]
                                );
                            }

                        console.log(odoo_data)
                            SmartService.create_facture_odoo(token, usrtoken, {data: odoo_data}).then(createFactRes => {
                                console.log(createFactRes)
                                if (createFactRes.succes === true && createFactRes.status === 200) {

                                    SmartService.validate_facture_odoo(token, usrtoken,
                                        {
                                            data: [[createFactRes.data.id]]
                                        }).then(validateRes => {
                                        console.log(validateRes)
                                        if (validateRes.succes === true && validateRes.status === 200) {

                                            SmartService.generate_facture_odoo(token, usrtoken, createFactRes.data.id, acces_token).then(genFactRes => {
                                                console.log(genFactRes)

                                                if (genFactRes.succes === true && genFactRes.status === 200) {
                                                    resolve({b64:genFactRes.data.pdf,facture_id:createFactRes.data.id})
                                                }else{
                                                    reject(genFactRes.error)
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                                reject(err)
                                            })
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                        reject(err)
                                    })
                                }
                            }).catch(err => {
                                console.log(err)
                                reject(err)
                            })

                        }
                    })
                }
            })

        })
    }

    const save_rethink_woo_user = (data) => {
        return  new Promise((resolve, reject) => {

            rethink.createTable(db_name,"woo_users","test").then( r => {

                rethink.insert("test", 'table("woo_users").insert(' + JSON.stringify(data) + ')', db_name, false).then(resAdd => {
                    if (resAdd && resAdd === true) {
                        console.log("woo user added")
                        resolve(true)
                    } else {
                        console.log("ERROR ADD WOO USER")
                        resolve(false)
                    }
                }).catch(err => {
                    console.log(err)
                    resolve(false)
                })

            }).catch(err => {
                console.log(err)
                resolve(false)
            })
        })
    }

    const verif_current_user_registration = () => {

        rethink.getTableData(db_name,"test","woo_users").then( res => {
            let users = res || []
            let find_current = users.find(x => x.email === localStorage.getItem("email"))
            if(find_current){
                console.log("OLD USER")
                setCurrentUser(find_current)
            }else{
                console.log("NEW USER")
            }
        }).catch( err => {
            console.log(err)
        })
    }

    const total = parseFloat(livraison) + parseFloat(sousTotal) + (etiquettes * 7.5)

    return (
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
                                                    <div style={{fontWeight: 700}}>
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
                                                            <div onClick={() => {
                                                            }}
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
                                                            <div onClick={() => {
                                                            }}
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

                            <div align="center" style={{marginTop: 30}}>
                                <img alt="" src={require("../../assets/icons/empty_cart.png")} style={{width: "40%"}}/>
                                <h6 style={{marginTop: 15}}>Aucun produit encore ajouté dans votre panier</h6>
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
                        {
                            etiquettes > 0 &&
                            <div className="row align-items-center justify-content-between mt-2">
                                <div className="col-4">
                                    <text>Etiquettes</text>
                                </div>
                                <div className="col-4">
                                    <text>{etiquettes + " x " + "7.5 €  =  " + (etiquettes * 7.5) + " €"}</text>
                                </div>
                            </div>
                        }

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
                                    <Button style={{
                                        borderRadius: 20,
                                        fontWeight: 700,
                                        textTransform: "none",
                                        marginTop: 15
                                    }} variant="contained" color="secondary"
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
                                disabled={localStorage.getItem("email") !== null && localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== ""}
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
                                    }}>Payer {total + " €"}</Button>
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
