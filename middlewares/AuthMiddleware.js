const {UserModel} = require('../db/db');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
//const  = require( ');

async function userExistMiddleWare(req,res,next) { 
   const {userName, email, password} = req.body; 
   try {
    const userExist = await UserModel.findOne({
      userName,
      email,
      password
   });
     if(userExist){
       res.json({message:"You are already registered"});
     } 
     else{
       next();
     }
  } catch (error) {
    res.json({error:error})
  }  
}

// are they authorized person to access the application
function authMiddleware(req, res, next){

  const token = req.headers.token;
  const decodedData = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  console.log("token.userId",decodedData);
  if(decodedData){
    req.userId = decodedData.userId
    next();
  }else{
    res.status(403).json({
      message:"Invalid Creds"
    })
  }
}

module.exports = { userExistMiddleWare, authMiddleware };
//module.exports = userExistMiddleWare