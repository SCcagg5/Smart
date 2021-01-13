import React, { useMemo } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import {
    Switch,
    Route,
    Redirect,
    useLocation,
    useHistory,
    withRouter
} from "react-router-dom";
import CheckoutService from "../../provider/checkoutservice"
import useResponsiveFontSize from "./useResponsiveFrontSize";
import axios from "axios";

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
            }
        }),
        [fontSize]
    );

    return options;
};

const SplitForm = (produits) => {
    const history=useHistory()
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async event => {

        console.log(produits.produits.produits)

        event.preventDefault();

        if (!stripe || !elements) {

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
                                    history.goBack()
                                }, 3000);
                            })
                        })
                    }
                })

            })






        }


    };

    return (
        <form  onSubmit={handleSubmit}>
            <div className="form-row">
            <label className="w-75">
                Card number
                <CardNumberElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            </div>
           <div>
            <label className="w-75" >
                Expiration date
                <CardExpiryElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
           </div>
            <div>
            <label className="w-50">
                CVC
                <CardCvcElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            </div>
            <button className="stripe" type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default withRouter(SplitForm);
