import express from 'express'
import User from '../models/User.js'
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

// import { config } from "dotenv";

// config();

const router = express.Router();

//REGISTER

router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    
    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
      } catch (err) {
        return res.status(500).json(err);
      }
     
});

//LOGIN

router.post("/login", async(req,res)=>{
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
    const oPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (oPassword!==req.body.password) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );

    const { password, ...others } = user._doc;  
    return res.status(200).json({...others, accessToken});

    // return res.status(200).json(user);

  }catch (err) {
    return res.status(500).json(err);
  }
});


export default router