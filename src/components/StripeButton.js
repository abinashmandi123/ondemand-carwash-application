import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StripeButton = ({ price, car, washPackage, address }) => {
  const [loading, setLoading] = useState(false);
  const publishableKey =
    "pk_test_51JGnd3SJTItLSsbLHSfcV4t3SAjnGZW7QgwIz5mRJK1pzcc26dxkeOy4VJtXVhnq5Dir5YKQ2ayXWvdFPWLmGz8y0057fvwopN";
  const stripePrice = price * 100;

  const onToken = (token) => {
    setLoading(true);
    axios
      .post("http://localhost:8084/payment", {
        amount: stripePrice,
        token,
      })
      .then(() => {
        toast.success("Payment successful! Your booking is being processed.");
        const date = new Date().toLocaleString();
        AuthService.createBooking(
          car.carNumber,
          car.carModel,
          car.owner,
          washPackage,
          address,
          date
        )
          .then((res) => {
            toast.info("Booking successfully created.");
          })
          .catch((err) => {
            setLoading(false);
            toast.error("Unable to create booking, please try again.");
          });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Payment error:", error);
        toast.error("Payment failed. Please check your card details or try again.");
      });
  };

  return (
    <>
      <StripeCheckout
        amount={stripePrice}
        label={loading ? "Processing..." : "Begin Payment"}
        name="Green Wash"
        image="https://svgshare.com/i/CUz.svg"
        description={`Your total is ${price}`}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        currency="INR"
        disabled={loading}
      />
      <ToastContainer />
    </>
  );
};

export default StripeButton;
