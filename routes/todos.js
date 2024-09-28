// router import
const {Router} = require('express');
const {TodoModel} = require('../db/db');
const {authMiddleware} = require('../middlewares/AuthMiddleware');
const todosRouter = Router();

todosRouter.post('/newTodo',authMiddleware, async function(req,res){
  const userId = req.userId // which is foreign key 
  const userTodos =await TodoModel.create({
    userId : userId,
    title: req.body.title
  });
  res.send('todo is created');
});

todosRouter.get('/all',authMiddleware, async function(req,res){ 

  const userId = req.userId // which is foreign key 
  // particular user todos we need to fetch not all the todos
  console.log(userId)
  try {
    const userTodos =await TodoModel.findOne({
      userId : userId
   });
   res.json(userTodos);  
  } catch (error) {
    res.json({"msg":error})
  }
  
});

module.exports={
   todosRouter
}