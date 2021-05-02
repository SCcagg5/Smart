import React, { useMemo } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    IbanElement
} from "@stripe/react-stripe-js";
import {
    Switch,
    Route,
    Redirect,
    useLocation,
    useHistory,
    withRouter
} from "react-router-dom";
import moment from"moment"

import CheckoutService from "../../provider/checkoutservice"
import SmartService from "../../provider/SmartService"
import useResponsiveFontSize from "./useResponsiveFrontSize";
import axios from "axios";
import utilFunctions from "../../tools/functions"
import rethink from "../../controller/rethink";
const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            },
            supportedCountries: ['SEPA'],
            // If you know the country of the customer, you can optionally pass it to
            // the Element as placeholderCountry. The example IBAN that is being used
            // as placeholder will reflect the IBAN format of that country.
            placeholderCountry: 'DE',
        }),
        [fontSize]
    );

    return options;
};
const IbanForm = (produits ) => {
    const history=useHistory()
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();
    let acces_token = utilFunctions.getUID();



    const createFacture = ()=>{

        let odoo_data = [{
            "access_token":"eafd285777ggobfvxyvnx",
            "state": "draft",
            "type": "out_invoice",
            "invoice_sent": false,
            "l10n_ch_isr_sent": false,
            "name": "Label.vin",
            "invoice_date": moment().format("YYYY-MM-DD"),
            "date": moment().format("YYYY-MM-DD"),
            "journal_id": 1,
            "currency_id": 5,
            "invoice_user_id": 3,
            "invoice_incoterm_id": false,
            "auto_post": false,
            "to_check": false,
            "authorized_transaction_ids": [
                [
                    6,
                    false,
                    []
                ]
            ],
            "tax_lock_date_message": false,
            "id": false,
            "invoice_payment_state": "not_paid",
            "invoice_filter_type_domain": "sale",
            "company_currency_id": 5,
            "commercial_partner_id": "",
            "bank_partner_id": 1,
            "invoice_has_outstanding": false,
            "l10n_ch_currency_name": "CHF",
            "invoice_sequence_number_next_prefix": false,
            "invoice_sequence_number_next": false,
            "invoice_has_matching_suspense_amount": false,
            "has_reconciled_entries": false,
            "restrict_mode_hash_table": false,
            "partner_id": 84,
            "ref": 121006,
            "invoice_vendor_bill_id": false,
            "invoice_payment_term_id": 1,
            "invoice_date_due": "2020-09-06",
            "company_id": 1,
            "amount_untaxed": 0,
            "amount_by_group": [],
            "amount_total": 0,
            "invoice_payments_widget": "False",
            "amount_residual": 0,
            "invoice_outstanding_credits_debits_widget": false,
            "narration": false,
            "invoice_origin": false,
            "fiscal_position_id": 1,
            "invoice_cash_rounding_id": false,
            "invoice_source_email": false,
            "invoice_payment_ref": false,
            "invoice_partner_bank_id": false,
            "reversed_entry_id": false,
            "message_follower_ids": [],
            "activity_ids": [],
            "message_ids": [],
            "message_attachment_count": 0,
            "invoice_line_ids": [],
            "line_ids": []
        }]

        produits.produits.produits.map((item,key)=>{
            odoo_data[0].invoice_line_ids.push(
                [
                    0,
                    "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "sequence": 10,
                        "account_id": 104,
                        "quantity": 1,
                        "discount": 0,
                        "partner_id": false,
                        "currency_id": false,
                        "debit": 0,
                        "credit": 60,
                        "display_type": false,
                        "product_id": 1,
                        "name": item.nomProd,
                        "analytic_account_id": false,
                        "analytic_tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],

                        "price_unit": parseFloat(item.prix),
                        "tax_ids": [
                            [
                                6,false,[]
                            ]
                        ],
                        "amount_currency": 0,
                        "date_maturity": false,
                        "tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                        "recompute_tax_line": false,
                        "is_rounding_line": false,
                        "exclude_from_invoice_tab": false
                    }
                ]
            )
        })

        //console.log(total)
        /*  odoo_data[0].line_ids.push(
              [
                  0,
                  "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                  {
                      "account_id": 6,
                      "sequence": 10,
                      "name": false,
                      "quantity": 1,
                      "price_unit": 350,
                      "discount": 0,
                      "debit": -350,
                      "credit": 350,
                      "amount_currency": 0,
                      "date_maturity": "2020-09-08",
                      "currency_id": false,
                      "partner_id": false,
                      "product_uom_id": false,
                      "product_id": false,
                      "payment_id": false,
                      "tax_ids": [
                          [
                              6,
                              false,
                              []
                          ]
                      ],
                      "tax_base_amount": 0,
                      "tax_exigible": true,
                      "tax_repartition_line_id": false,
                      "tag_ids": [
                          [
                              6,
                              false,
                              []
                          ]
                      ],
                      "analytic_account_id": false,
                      "analytic_tag_ids": [
                          [
                              6,
                              false,
                              []
                          ]
                      ],
                      "recompute_tax_line": false,
                      "display_type": false,
                      "is_rounding_line": false,
                      "exclude_from_invoice_tab": true
                  }
              ]
          )

         */

        SmartService.create_facture_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken"),{data:odoo_data}).then( createFactRes => {
            console.log(createFactRes)
            addFacturePayment("http://91.121.162.202:10013/my/invoices/"+createFactRes.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true")
          //  history.goBack()
           // history.push('/chat',{facture:"http://91.121.162.202:10013/my/invoices/"+createFactRes.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true" })
           // window.open("http://91.121.162.202:10013/my/invoices/"+createFactRes.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true","_blank")
        }).then(()=>{
            addCommande()
        }).catch(err => {
            console.log(err);
        })



    }

    const addCommande=()=>{
        console.log(produits.produits.produits)
        let user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        let data = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: true,
            billing: {
                first_name: user.firstname,
                last_name: user.lastname,
                address_1: "969 Market",
                address_2: "",
                city: "San Francisco",
                state: "CA",
                postcode: "94103",
                country: "US",
                email: user.email,
                phone: user.phone
            },
            shipping: {
                first_name: user.firstname,
                last_name: user.lastname,
                address_1: "969 Market",
                address_2: "",
                city: "San Francisco",
                state: "CA",
                postcode: "94103",
                country: "US"
            },
            line_items: [

            ],
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: "10.00"
                }
            ]
        };

        produits.produits.produits.map((item,key)=>{
            data.line_items.push({
                product_id: item.id_prod,
                quantity: 1
            },)
        })

        CheckoutService.addOrder(data).then((res)=>{
            console.log(res)
            if (res.error===null){
                history.goBack()
            }
        })


    }
    const db_name = "894ca0ed-8b4a-41fd-aeff-8de26ee1bcf9";

   const addFacturePayment=(facture)=>{
       console.log(produits.roomId)
       let newItem = {
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            room_id: produits.roomId,
            sender: {
                email: localStorage.getItem("email")
            },
            type: "facture_payment",
            urlfacture:facture,

        }


            rethink.insert("Etiquettepers.js", 'table("chat").insert(' + JSON.stringify(newItem) + ')', db_name, false).then(resAdd => {
                if (resAdd && resAdd === true) {

                } else {
                    console.log("Erreur add msg chat !")
                }
            }).catch(err => {
                console.log(err)
            })



    }

    const handleSubmit = async event => {

        console.log(produits.produits.produits)

        event.preventDefault();

        var sourceData = {
            type: 'sepa_debit',
            currency: 'eur',
            owner: {
                name: document.querySelector('input[name="name"]').value,
                email: document.querySelector('input[name="email"]').value,
            },
            mandate: {
                // Automatically send a mandate notification email to your customer
                // once the source is charged.
                notification_method: 'email',
            },
        };

        stripe.createSource(elements.getElement(IbanElement), sourceData).then(async function (result) {
            if (result.error) {
                // Inform the customer that there was an error.
                let errorElement = document.getElementById('error-message');
                errorElement.textContent = result.error.message;
            } else {
                await axios.post('http://localhost:3001/api/Stripe', {
                    amount: 500,
                    source: result.source.id,
                    receipt_email: document.querySelector('input[name="email"]').value
                }).then((result) => {
                    console.log(result.status)
                    if (result.status === 200) {
                        let data = {
                            email_user: localStorage.getItem('email'),
                            create_at: "25/06/2222"
                        }
                        CheckoutService.CreateCheckout(data).then((res) => {
                            let idCheckout = ""
                            if (res.error === false) {
                                console.log("temchi")
                                idCheckout = res.data
                                produits.produits.produits.map((item, key) => {
                                    item.id_checkout = idCheckout
                                    CheckoutService.CreateCheckoutProduits(item).then((ress) => {
                                        console.log(ress)
                                    })
                                })


                            }
                            return idCheckout
                        }).then((id) => {
                            CheckoutService.sendMail(localStorage.getItem('email'), id).then((rr) => {
                                console.log(rr)
                                alert("payment done")
                                setTimeout(() => {
                                    createFacture()
                                }, 3000);
                            })
                        })
                    }
                })
            }
        });


       /* if (!stripe || !elements) {

            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }else {
            const payload = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement)
            });
            console.log(payload)
            const token =stripe.createToken(elements.getElement(CardNumberElement))
            token.then(async (res) => {
                console.log(res.token.id)
                await axios.post('http://localhost:3001/api/Stripe', {
                    amount: 500,
                    source: res.token.id,
                    receipt_email: 'customer@example.com'
                }).then((result)=>{
                    console.log(result.status)
                    if (result.status===200){
                        let data ={
                            email_user:localStorage.getItem('email'),
                            create_at:"25/06/2222"
                        }
                        CheckoutService.CreateCheckout(data).then((res)=>{
                            let idCheckout=""
                            if (res.error===false){
                                console.log("temchi")
                                idCheckout=res.data
                                produits.produits.produits.map((item,key)=>{
                                    item.id_checkout=idCheckout
                                    CheckoutService.CreateCheckoutProduits(item).then((ress)=>{
                                        console.log(ress)
                                    })
                                })





                            }
                            return idCheckout
                        }).then((id)=>{
                            CheckoutService.sendMail(localStorage.getItem('email'),id).then((rr)=>{
                                console.log(rr)
                                alert("payment done")
                                setTimeout(() => {
                                    createFacture()
                                }, 3000);
                            })
                        })
                    }
                })

            })






        }*/


    };

    return (

            <div>
                <form onSubmit={handleSubmit}  >
                    <div className="form-row inline">
                        <div className="col">
                            <label htmlFor="name">
                                Name
                            </label>
                            <input id="name" name="name" placeholder="Jenny Rosen" required/>
                        </div>
                        <div className="col">
                            <label htmlFor="email">
                                Email Address
                            </label>
                            <input id="email" name="email" type="email" placeholder="jenny.rosen@example.com" required/>
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="iban-element">
                            IBAN
                        </label>
                        <div  >
                            <IbanElement
                                onChange={event => {
                                    console.log("CardNumberElement [change]", event);
                                }}
                                options={options}

                            />



                        </div>
                    </div>

                    <button className="stripe" type="submit">Submit Payment</button>

                    <div id="error-message" role="alert"></div>

                    <div id="mandate-acceptance">
                        By providing your IBAN and confirming this payment, you authorise
                        (A) Rocketship Inc. and Stripe, our payment service
                        provider, to send instructions to your bank to debit your account and
                        (B) your bank to debit your account in accordance with those instructions.
                        You are entitled to a refund from your bank under the terms and
                        conditions of your agreement with your bank. A refund must be claimed
                        within 8 weeks starting from the date on which your account was debited.
                    </div>
                </form>

            </div>
        );
    }


export default withRouter(IbanForm);
