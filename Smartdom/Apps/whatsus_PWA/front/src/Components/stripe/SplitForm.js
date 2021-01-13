import React, { useMemo } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";

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

const SplitForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async event => {
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
                const order = await axios.post('http://localhost:3001/api/Stripe', {
                    amount: 500,
                    source: res.token.id,
                    receipt_email: 'customer@example.com'
                })
                console.log(order)
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

export default SplitForm;
