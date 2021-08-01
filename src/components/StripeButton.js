import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import AuthService from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StripeButton = ({ price,car,washPackage,address }) => {
  const publishableKey = "pk_test_51JGnd3SJTItLSsbLHSfcV4t3SAjnGZW7QgwIz5mRJK1pzcc26dxkeOy4VJtXVhnq5Dir5YKQ2ayXWvdFPWLmGz8y0057fvwopN";
  const stripePrice = price * 100;

  const onToken = (token) => {
    console.log(token);
    axios
      .post("http://localhost:8084/payment", {
        amount: stripePrice,
        token,
      })
      .then((response) => {
        console.log(response);
        toast.success("payment success");
        const date=new Date().toLocaleString();
        AuthService.createBooking(car.carNumber,car.carModel,car.owner,washPackage,address,date).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
          toast.error("unable to book wash");
        })

      })
      .catch((error) => {
        console.log(error);
        alert("Payment failed");
      });
  };

  return (
    <>
    <StripeCheckout
      amount={stripePrice}
      label="Confirm Booking"
      name="Green Wash"
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}`}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="INR"
    />
    <ToastContainer/>
    </>
  );
};

export default StripeButton;