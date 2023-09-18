import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetatData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const payBtn1 = useRef(null); 
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            modePayment: "Payement By Card",
          };

          dispatch(createOrder(order));
          console.log(order)
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
        }
      } catch (error) {
          payBtn.current.disabled = false;
          if (error.response) {
            alert.error(error.response.data.message);
          } else {
            alert.error("There was an error processing your payment. Please try again.");
          } 
    }
  };

  
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    payBtn1.current.disabled = true;

    try{

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
  
      order.paymentInfo = {
        id : uuidv4(), // TODO : generate uuid automatically
        type: "Cash On Delivery",
        status: "succeeded",
        modePayment: "Cash on Delivery",
      };
  
      
      dispatch(createOrder(order));
      navigate("/success");
      // console.log(order);

    }catch(error){
      payBtn1.current.disabled = false;
          if (error.response) {
            alert.error(error.response.data.message);
          } else {
            alert.error("There was an error processing your payment. Please try again.");
          } 
    }

    
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);


  
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm">
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="button"
            value={`Pay - ${orderInfo && orderInfo.totalPrice} FCFA`}
            ref={payBtn}
            className="paymentFormBtn"
            onClick={(e) => submitHandler(e)}
          />

          <Typography>Cash Payment</Typography>
          <input
            type="button"
            value={`Pay - ${orderInfo && orderInfo.totalPrice} FCFA on cash on Delivery`}
            ref={payBtn1}
            className="paymentFormBtn"
            onClick={(e) => cashOnDeliveryHandler(e)}
          />
        </form>        
      </div>
    </Fragment>
  );
};

export default Payment;
