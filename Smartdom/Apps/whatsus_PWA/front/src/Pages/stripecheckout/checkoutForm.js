import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements'
import axios from 'axios'
import './CheckoutForm.scss'


const endpoint = "http://localhost:3001"

const CheckoutForm = ({ selectedProduct, stripe, history }) => {
    if (selectedProduct === null) history.push('/')

    const [receiptUrl, setReceiptUrl] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()

        const { token } = await stripe.createToken()

        const order = await axios.post(endpoint + '/api/Stripe', {
            amount: 500,
            source: token.id,
            receipt_email: 'customer@example.com'
        })

        setReceiptUrl(order.data.charge.receipt_url)
    }
    if (receiptUrl) {
        return (
            <div className="success">
                <h2>Paiement effectué avec succès !</h2>
                <a href={receiptUrl}>Voir le reçu</a>
                <Link to="/">Accueil</Link>
            </div>
        )
    }
    return (
        <div className="checkout-form">
            <p>Montant: ${selectedProduct.price}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Numéro de carte
                    <CardNumberElement />
                </label>
                <label>
                    Date d'éxpiration
                    <CardExpiryElement />
                </label>
                <label>
                    CVC
                    <CardCVCElement />
                </label>
                <button type="submit" className="order-button">
                    Payer
                </button>
            </form>
        </div>
    )
}

export default injectStripe(CheckoutForm)
