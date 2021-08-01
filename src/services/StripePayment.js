import React from 'react'
import Stripe from "react-stripe-checkout";
import axios from "axios";

function StripePayment() {

    async function handleToken(token) {
        console.log(token);
        await axios.post("http://localhost:9090/api/payment/charge", "", {         headers: {
          token: token.id,
          amount: 500,
        },}).then(() => {
           alert("Payment Success");
           }).catch((error) => {
           alert(error);
           });
        }
    return (
        <div>
            <Stripe
stripeKey="pk_test_51JGnd3SJTItLSsbLHSfcV4t3SAjnGZW7QgwIz5mRJK1pzcc26dxkeOy4VJtXVhnq5Dir5YKQ2ayXWvdFPWLmGz8y0057fvwopN"
token={handleToken}
/>
        </div>
    )
}

export default StripePayment
