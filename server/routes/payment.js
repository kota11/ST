import express from "express";
import { instance } from "../index.js";
import crypto from "crypto";
import  Payment  from "../models/Payment.js";
// import {
//   checkout,
//   paymentVerification,
// } from "../controllers/paymentController.js";

const router = express.Router();

//place order

router.post("/checkout", async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
  
    try {
        const order = await instance.orders.create(options);
  
        res.status(200).json({
          success: true,
          order,
        });
    } catch (err) {
      res.status(500).json(err);
    }
});

// router.route("/paymentverification").post(paymentVerification);

router.post("/paymentverification", async (req, res) => {
    // console.log(req.body);

    // res.status(200).json({success:true,});

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
    
});


router.get("/cancel", async (req, res) => {
  
  res.status(400).json({
    success: false,
  });
  
  
});



export default router;


// export const checkout = async (req, res) => {
//     const options = {
//       amount: Number(req.body.amount * 100),
//       currency: "INR",
//     };
//     const order = await instance.orders.create(options);
  
//     res.status(200).json({
//       success: true,
//       order,
//     });
// };

// export const paymentVerification = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
  
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
  
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//       .update(body.toString())
//       .digest("hex");
  
//     const isAuthentic = expectedSignature === razorpay_signature;
  
//     if (isAuthentic) {
//       // Database comes here
  
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });
  
//       res.redirect(
//         `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//       );
//     } else {
//       res.status(400).json({
//         success: false,
//       });
//     }
//   };