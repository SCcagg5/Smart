import React, {useEffect} from "react";
import MuiBackdrop from "../../Components/Loading/MuiBackdrop";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FaceIcon from "@material-ui/icons/Face";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import EmailIcon from "@material-ui/icons/Email";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import WooService from "../../provider/wooService";
import {Input, StripeCardInput} from "react-rainbow-components";
import "./style.css"
import rethink from "../../controller/rethink";
import SmartService from "../../provider/SmartService";
import utilFunctions from "../../tools/functions";
import moment from "moment";
import maillingService from "../../provider/maillingService";
import Data from "../../data/Data";

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
    const [updateSc, setUpdateSc] = React.useState(false)




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
            setSousTotal(sousTotal)
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

                                        /*let dataTicket = JSON.parse(localStorage.getItem('etiquette'))
                                        console.log(currentUser)
                                        dataTicket.id=currentUser.id
                                        dataTicket.total=sousTotal
                                        WooService.generateTicket(dataTicket)*/

                                        let odoo_facture_data = await generate_facture_odoo()
                                        console.log(odoo_facture_data)
                                        if(odoo_facture_data.url && odoo_facture_data.url !== ""){
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
                                                odoo_fact_url:odoo_facture_data.url,
                                                access_token:odoo_facture_data.access_token
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
                                                        "subject":"Facture Casa.Verde",
                                                        "msg":"Madame/Monsieur,<br/><br/>Suite à votre achat sur notre site <b>Casa.Verde</b> effectué(e) le "+moment().format("DD-MM-YYYY HH:mm")+" et correspondant au bon de commande n° " +orderRes.data.id +", nous vous adressons ci-joint une facture avec les détails de votre commande.",
                                                        "footerMsg":"<br/><br/>En vous remerciant par avance,<br/><br/><br/>Cordialement",
                                                        "attach":[
                                                            {
                                                                filename:"Facture_CasaVerde_" + moment().format("DD-MM-YYYY")+".pdf",
                                                                path:odoo_facture_data.url_display
                                                            }
                                                        ]
                                                    }).then(sendRes => {
                                                        console.log(sendRes)
                                                    })
                                                    setLoading(false)
                                                    openSnackbar("success", "Félicitation ! Votre commande est effectué avec succès")
                                                    viderPanier()
                                                    props.onClearPanier()
                                                    props.history.push('/home/chat',{isOnlyBot:true,odoo_fact_url:odoo_facture_data.url})
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
                                "state": "draft",
                                "type": "out_invoice",
                                "auto_post": false,
                                "currency_id": 1,
                                "date": moment().format("YYYY-MM-DD"),
                                "fiscal_position_id": false,
                                "invoice_cash_rounding_id":false,
                                "invoice_date": moment().format("YYYY-MM-DD"),
                                "invoice_date_due": moment().format("YYYY-MM-DD"),
                                "invoice_incoterm_id": false,
                                "invoice_origin": false,
                                "invoice_partner_bank_id": false,
                                "invoice_payment_ref": false,
                                "invoice_payment_state": "not_paid",
                                "invoice_payment_term_id": 1,
                                "invoice_sequence_number_next": false,
                                "invoice_source_email": false,
                                "invoice_user_id": 2,
                                "invoice_vendor_bill_id": false,
                                "message_attachment_count": 0,
                                "journal_id":1,
                                "narration": false,
                                "partner_id": 16,
                                "ref":false,
                                "to_check": false,
                                /*journal_id: 1,
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
                                incoterm_id: false,*/
                                invoice_line_ids:[]
                            }];

                            let order_products = cart || [];
                            order_products.map((product,key) => {
                                let odoo_product_id = false;
                                if(product.attributes.length > 0){
                                    let find = product.attributes.find(x => x.name === "odoo product id")
                                    if(find){
                                        if(find.options && find.options.length > 0){
                                            odoo_product_id = parseInt(find.options[0])
                                        }
                                    }
                                }
                                odoo_data[0].invoice_line_ids.push(
                                    [
                                        0,
                                        'virtual_' + (Math.floor(100 + Math.random() * 900)).toString(),
                                        {
                                            "amount_currency":0,
                                            "is_rounding_line": false,
                                            "analytic_account_id": false,
                                            "name": product.name || "",
                                            "date_maturity": false,
                                            "price_unit": parseFloat(product.price),
                                            "quantity":parseInt(product.quantite),
                                            "product_id": odoo_product_id,
                                            "product_uom_id":1,
                                            "currency_id": false,
                                            "parent_state": "draft",
                                            "exclude_from_invoice_tab":false,
                                            "account_id": 653,
                                            "debit": 0,
                                            "credit": 0,
                                            "discount": 0,
                                            "display_type": false,
                                            "recompute_tax_line": false,
                                            "partner_id":16,
                                            /*is_rounding_line: false,
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
                                            account_id: 636,*/
                                            tag_ids: [
                                                [6, false, []]
                                            ],
                                            tax_ids:[[6,false,[]]],
                                            "sequence":10
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
                                            "amount_currency":0,
                                            "is_rounding_line": false,
                                            "analytic_account_id": false,
                                            "name": "Etiquette",
                                            "date_maturity": false,
                                            "price_unit": 7.5,
                                            "quantity":etiquettes,
                                            "product_id": false,
                                            "currency_id": false,
                                            "parent_state": "draft",
                                            "exclude_from_invoice_tab":false,
                                            "account_id": 653,
                                            "debit": 0,
                                            "credit": 0,
                                            "discount": 0,
                                            "display_type": false,
                                            "recompute_tax_line": false,
                                            "partner_id":16,
                                            "tag_ids": [[6, false, []]],
                                            "tax_ids":[[6,false,[]]],
                                            "sequence":10
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
                                            console.log(validateRes)
                                            resolve({url:"https://odoo010.3.rocketbonds.ch/my/invoices/"+createFactRes.data.id+"?access_token="+acces_token+"&report_type=pdf&download=true",
                                                url_display:"https://odoo010.3.rocketbonds.ch/my/invoices/"+createFactRes.data.id+"?access_token="+acces_token+"&report_type=pdf",
                                                facture_id:createFactRes.data.id,access_token:acces_token})

                                            /*SmartService.generate_facture_odoo(token, usrtoken, createFactRes.data.id, acces_token).then(genFactRes => {
                                                console.log(genFactRes)
                                                if (genFactRes.succes === true && genFactRes.status === 200) {
                                                    resolve({b64:genFactRes.data.pdf,facture_id:createFactRes.data.id})
                                                }else{
                                                    reject(genFactRes.error)
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                                reject(err)
                                            })*/
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

    const addProductQuantity = (product) => {
        let findProductIndex = cart.findIndex(x => x.id === product.id)
        let newCart = cart;
        newCart[findProductIndex].quantite = parseFloat(product.quantite) + 1
        let sousTotal = 0;
        newCart.map(item => {
            sousTotal = sousTotal + (item.price * item.quantite)
        })
        setSousTotal(sousTotal)
        setCart(newCart)
        props.onAddToCart(cart.length)
        localStorage.setItem('cart',JSON.stringify(cart))
        setUpdateSc(!updateSc)
    }

    const subtractProductQuantity = (product) => {
        if(product.quantite > 1){
            let findProductIndex = cart.findIndex(x => x.id === product.id)
            let newCart = cart;
            newCart[findProductIndex].quantite = product.quantite - 1
            let sousTotal = 0;
            newCart.map(item => {
                sousTotal = sousTotal + (item.price * item.quantite)
            })
            setSousTotal(sousTotal)
            setCart(newCart)
            props.onAddToCart(cart.length)
            localStorage.setItem('cart',JSON.stringify(cart))
            setUpdateSc(!updateSc)
        }else if( product.quantite === 1){
            let findProductIndex = cart.findIndex(x => x.id === product.id)
            let newCart = cart;
            newCart.splice(findProductIndex,1);
            let sousTotal = 0;
            newCart.map(item => {
                sousTotal = sousTotal + (item.price * item.quantite)
            })
            setSousTotal(sousTotal)
            setCart(newCart)
            props.onAddToCart(cart.length)
            localStorage.setItem('cart',JSON.stringify(cart))
            setUpdateSc(!updateSc)
        }

    }

    const total = parseFloat(livraison) + parseFloat(sousTotal) + (etiquettes * 7.5)

    return (
        <div>
            <MuiBackdrop open={loading}/>
            <div style={{ minHeight: "100vh", marginTop: 50, overflow: "auto"}}>

                {
                    cart.length === 0 ?
                        <div align="center" style={{marginTop: 30}}>
                            <img alt="" src={require("../../assets/icons/shopping-basket.png")} style={{width: "30%",marginTop:15}}/>
                            <h6 style={{marginTop: 15}}>Aucun produit encore ajouté dans votre panier</h6>
                        </div>  :

                        <div>
                            <div className="cart_products_container">
                                <ul className="cart_ul">
                                    {
                                        cart.map((item, key) => (
                                            <li className="cart_li">
                                                <div className="cart_li_left">
                                                    <div className="image_container">
                                                        <img alt="" src={item.images[0].src} width={80} style={{position:"relative"}}/>
                                                    </div>
                                                </div>
                                                <div className="cart_li_right">
                                                    <div style={{fontSize:"0.875rem",fontWeight:600,lineHeight:"1.5rem",color:"#333",marginTop:18}}>{item.name}</div>
                                                    <div className="price_counter_conatiner">
                                                        <div className="price_counter_form">
                                                            <button className="btn_price_counter" onClick={() => {subtractProductQuantity(item)}}
                                                                    style={{borderColor:item.quantite === 1 ? "red" : "#333"}}
                                                            >
                                                                {
                                                                    item.quantite === 1 ?
                                                                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V3.55556H0.857143V14.2222ZM2.57143 5.33333H9.42857V14.2222H2.57143V5.33333ZM9 0.888889L8.14286 0H3.85714L3 0.888889H0V2.66667H12V0.888889H9Z"
                                                                                  fill={"#ff5252"}/>
                                                                        </svg>  :

                                                                        <svg width="14" height="2" viewBox="0 0 14 2" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M14 2H0V0H14V2Z" fill={"#4A4A4A"}/>
                                                                        </svg>
                                                                }

                                                            </button>
                                                            <div className="input_counter_container">
                                                                <span className="input_span1">
                                                                    <span className="input_span2">
                                                                        <input className="input_counter" value={item.quantite} readOnly={true}/>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <button className="btn_price_counter" onClick={() => {addProductQuantity(item)}}>
                                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#4A4A4A"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <div style={{fontSize:"1rem",fontWeight:600,color:"#333"}}>
                                                                <span>{(item.price * item.quantite).toFixed(2) + " €"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div style={{padding:"1.5rem 1.4rem"}}>
                                <div className="subtotal_container">
                                    <div className="subtotal_row">
                                        <div className="subtotal_row_left">
                                            <div>Sous-total</div>
                                        </div>
                                        <div className="subtotal_row_right">
                                            <span>{sousTotal.toFixed(2) + " €"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="subtotal_container mt-1">
                                    <div className="subtotal_row">
                                        <div className="subtotal_row_left">
                                            <div>Livraison</div>
                                        </div>
                                        <div className="subtotal_row_right">
                                            <span>{livraison} €</span>
                                        </div>
                                    </div>
                                </div>

                                <hr style={{height: "0.0625rem", width: "100%", borderTop: '0.0625rem dashed #e0e0e0'}}/>

                                <div className="subtotal_container mt-1">
                                    <div className="subtotal_row">
                                        <div className="subtotal_row_left">
                                            <div>Total</div>
                                        </div>
                                        <div className="subtotal_row_right">
                                            <span>{total.toFixed(2) + " €"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 pb-4" style={{display:"flex",marginLeft:25,marginRight:25}}>
                                <button className="btn_add_cart" style={{backgroundColor:Data.primary_color,borderColor:Data.primary_color,marginBottom:90}}
                                        onClick={()=> {setOpenPayModal(true)}}
                                >
                                    Passer la commande
                                </button>
                            </div>
                        </div>
                }



            </div>


            <Dialog fullScreen={true} onClose={() => {
                setOpenPayModal(false)
            }}
                    aria-labelledby="simple-dialog-title" open={openPayModal}
            >
                <MuiBackdrop open={loading}/>
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
                        </div>
                        <div style={{marginTop: 25}}>
                            <FormControlLabel
                                control={<Checkbox name="checkedA" checked={true} color="primary"/>}
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
                                control={<Checkbox name="checkedA" checked={true} color="primary"/>}
                                label="Enregistrer votre email pour recevoir les factures"
                            />
                        </div>
                        <div align="center" style={{marginTop: 40}}>
                            <Button color="primary" variant="contained"
                                    onClick={() => {
                                        validateStripePayment()
                                    }}
                                    style={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: 20,
                                        width: "70%",
                                        height: 40,
                                        color:"#fff"
                                    }}>Payer {total.toFixed(2) + " €"}</Button>
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
