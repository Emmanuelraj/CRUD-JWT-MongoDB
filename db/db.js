const mongoose = require('mongoose'); // strict schema to avoid and maintain the database  
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


// struct of Schema
const User = new Schema({
  userName: String,
  email: {type: String, unique: true},
  password: String
});

// struct of Schema
const todo = new Schema({
  userId: ObjectId, // foreign Key
  title: String,
  done : Boolean
});


const UserModel = mongoose.model('users', User); //collection name
const TodoModel = mongoose.model('todos', todo); // collection name

module.exports={
  UserModel,
  TodoModel
}