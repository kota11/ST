import React from 'react'
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { publicRequest } from '../requestMethods';
import { useState } from 'react';

const Contain = styled.div`
  
  border: 0.5px solid lightgray;
  border-radius: 10px;
  
  padding: 10px
  
  
`;

const Info = styled.div`
  flex: 3;
  
  margin: 0 30px
  
`;


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  padding: 10px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 75px;
  
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Button = styled.button`
  width: 100%;
  padding: 10px ;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const CheckoutReview = () => {
  const cart = useSelector((state) => state.cart);  
  

  const checkoutHandler = async () => {

    try {
      const { data: { key } } = await publicRequest.get("/payment/getkey");
      const { data: { order } } = await publicRequest.post("/payment/checkout", {amount:`${cart.total}`});
      
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Science Tree",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/payment/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();


    } catch (error) {
        console.error("Error during checkout:", error);
    }

    
    

    
  };


  const makePayment = async () => {
    try {
        const { data: { key } } = await publicRequest.get("/payment/getkey");
        const { data: { order } } = await publicRequest.post("/payment/checkout", {amount:`${cart.total}`});

        const payload = {
            key_id: key,
            amount: order.amount,
            order_id: order.id,
            name: 'Acme Corp',
            description: 'A Wild Sheep Chase',
            image: 'https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.jpg',
            'prefill[name]': 'Gaurav Kumar',
            'prefill[contact]': '9123456780',
            'prefill[email]': 'gaurav.kumar@example.com',
            'notes[shipping address]': 'L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001',
            callback_url: "http://localhost:5000/api/payment/paymentverification",
            cancel_url: "http://localhost:5000/api/payment/cancel"
        };

        // Make the POST request through dynamic form
        const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://api.razorpay.com/v1/checkout/embedded';

            // Add hidden input fields
            for (const key in payload) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = payload[key];
                form.appendChild(input);
            }

            // Append the form to the body and submit it
            document.body.appendChild(form);
            form.submit();
    } catch (error) {
        console.error('Error during payment:', error);
        // Handle other errors (e.g., network issues)
    }
  };



  return (
    <Contain>
      <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>Qty:</b> {product.quantity}
                      </ProductId>
                      <ProductId>
                        <b>Price:</b> {product.price * product.quantity}
                      </ProductId>
                      
                    </Details>
                  </ProductDetail>
                  
                </Product>
                
              ))}
              
      </Info>
      <b>Total:</b> {cart.total}
      <Button onClick={checkoutHandler}>PROCEED TO PAY</Button>

      <Button onClick={makePayment}>Make Payment</Button>
      

    </Contain>
  )
}

export default CheckoutReview