require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {userRouter} = require('./routes/user');
const {todosRouter} = require('./routes/todos');
const {logoutRouter} = require('./routes/logout');

app.use(express.json()); // middleware for body-parser


app.use('/api/v1/user', userRouter);
app.use('/api/v1/todos', todosRouter);
app.use('/api/v1/user', logoutRouter);

//app.use('/api/v1/todos')


async function main(){
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000);
}

main()