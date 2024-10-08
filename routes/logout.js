const { Router }  = require("express");
const logoutRouter = Router();


logoutRouter.get('/logout',function (req,res) {
  
  console.log('logout')
  res.send('logout');
});


module.exports={
  logoutRouter
}