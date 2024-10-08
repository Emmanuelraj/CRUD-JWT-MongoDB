 const bcrypt = require('bcrypt');
const { Router } = require("express");
const jsonwebtoken = require("jsonwebtoken");
const { UserModel } = require("../db/db");
const  {userExistMiddleWare, authMiddleware}= require('../middlewares/AuthMiddleware'); 
const userRouter = Router();

require('dotenv').config();



// import the userModel
userRouter.post("/signup", userExistMiddleWare, async(req,res)=>{
  const {userName, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);

  // storing the password directly in DB  is wrong
  await UserModel.create({
    userName,
    email,
    password: hashedPassword
  })
  res.send('signup is done');
});


userRouter.post("/signin", async(req,res)=>{
    const {email, password} = req.body;
    try{
    const response = await UserModel.findOne({
      email
    })
    if(!response){
      res.status(403).json({
        msg:"User does not exist in DB"
      });
      return
    }
    const passwordMatch = await bcrypt.compare(password, response.password);
    if(passwordMatch){
      const token = jsonwebtoken.sign({
        userId: response._id.toString()
      }, process.env.JWT_SECRET);
      res.json({
        token:token
      });
    }else{
        res.status(403).json({
        message : "Invalid Credientials"
      });
    }
  }catch(err){
    res.json({msg: err});
  }   
});

module.exports={
  userRouter
}