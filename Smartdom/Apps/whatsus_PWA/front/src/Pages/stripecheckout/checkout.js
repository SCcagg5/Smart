import React, { useEffect } from 'react'
import {  Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import SplitForm from "../../Components/stripe/SplitForm"
import "./styles.css"
import ElementDemos from "./ElemnetDemos"

const stripePromise = loadStripe("pk_test_51Gu5l8AL9qNlrkR4v77NlhLVXhWfZEN8bz1hYWfyzAsmnv9W59RIL8SCX2Cq5oQ711Mp314IFNM8u6jaahqQ6vn700RgxiqGzz");
const demos = [

    {
        path: "/split-card-elements",
        label: "Split Card Elements",
        component: SplitForm
    },

];
const Checkout = ({ selectedProduct, history }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
            <Elements stripe={stripePromise}>*
                <ElementDemos demos={demos} />
            </Elements>

    )
}

export default Checkout
